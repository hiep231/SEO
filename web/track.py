import time
import random
import threading
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

BASE_URL = "https://minisetup.page.gd"
NUM_THREADS = 6  # Số luồng (số tab/cửa sổ) chạy cùng lúc
MIN_TIME_PER_PAGE = 300  # Thời gian tối thiểu trên mỗi trang (giây) = 5 phút

# Các đường dẫn hạt giống để bắt đầu, tạo sự phong phú ngay từ đầu thay vì chỉ vào trang chủ
SEED_URLS = [
    f"{BASE_URL}/en",
    f"{BASE_URL}/vi",
    f"{BASE_URL}/en/products",
    f"{BASE_URL}/vi/products",
    f"{BASE_URL}/en/tu-van",
    f"{BASE_URL}/vi/category/ban-phim-chuot",
    f"{BASE_URL}/en/category/tai-nghe"
]

def setup_driver():
    options = Options()
    # Chạy ẩn (headless) nếu muốn nhẹ máy, nhưng để tăng view SEO thì nên hiện cửa sổ (chạy thật)
    options.add_argument('--window-size=1280,720')
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    # Tắt thông báo rác
    options.add_argument("--disable-notifications")
    
    driver = webdriver.Chrome(options=options)
    return driver

def simulate_human_reading(driver, thread_id):
    """Mô phỏng hành vi đọc bài: cuộn ngẫu nhiên lên xuống, có ngập ngừng"""
    try:
        total_height = int(driver.execute_script("return document.body.scrollHeight"))
        viewport_height = int(driver.execute_script("return window.innerHeight"))
        
        # Nếu trang ngắn, không cần cuộn nhiều
        if total_height <= viewport_height:
            time.sleep(random.uniform(2, 5))
            return

        current_position = 0
        while current_position < total_height - viewport_height:
            # Cuộn xuống một đoạn ngẫu nhiên (chậm hay nhanh tùy thuộc vào độ dài đoạn cuộn)
            scroll_step = random.randint(300, 800)
            current_position += scroll_step
            driver.execute_script(f"window.scrollTo(0, {current_position});")
            
            # Tạm dừng như đang đọc nội dung đoạn vừa cuộn
            time.sleep(random.uniform(1.0, 3.5))
            
            # Thỉnh thoảng lướt ngược lên một chút (xác suất 30%) như kiểu đọc lại nội dung
            if random.random() < 0.3:
                scroll_up = random.randint(150, 400)
                current_position = max(0, current_position - scroll_up)
                driver.execute_script(f"window.scrollTo(0, {current_position});")
                # print(f"[{thread_id}] ^ Đang cuộn ngược lên để xem lại chi tiết...")
                time.sleep(random.uniform(1.5, 3.0))
                
    except Exception as e:
        pass

def bot_crawl(driver, thread_id):
    visited = set()
    to_visit = SEED_URLS.copy()
    
    # Xáo trộn ngẫu nhiên danh sách mở đầu để mỗi lần script chạy là 1 luồng đi khác nhau
    random.shuffle(to_visit) 
    
    max_pages = 80 # Số lượng trang tối đa mỗi lần cày
    pages_crawled = 0

    while to_visit and pages_crawled < max_pages:
        current_idx = random.randint(0, min(4, len(to_visit)-1))
        current_url = to_visit.pop(current_idx)
        
        if current_url in visited:
            continue
            
        print(f"\n[{thread_id}] [{pages_crawled + 1}/{max_pages}] Đang truy cập: {current_url}")
        try:
            start_time = time.time()
            driver.get(current_url)
            visited.add(current_url)
            pages_crawled += 1
            
            # Mô phỏng thời gian load trang và đọc lướt qua tiêu đề ban đầu
            time.sleep(random.uniform(1.5, 4.0))
            
            # Hành vi đọc chậm rãi
            print(f"[{thread_id}] -> Đang cuộn đọc trang...")
            simulate_human_reading(driver, thread_id)
            
            # ĐẢM BẢO Ở LẠI TRANG TỐI THIỂU 5 PHÚT
            elapsed = time.time() - start_time
            if elapsed < MIN_TIME_PER_PAGE:
                wait_remaining = MIN_TIME_PER_PAGE - elapsed
                print(f"[{thread_id}] -> Giữ trang thêm {wait_remaining:.0f}s để đạt tối thiểu {MIN_TIME_PER_PAGE//60} phút...")
                
                # Trong lúc chờ, thi thoảng cuộn nhẹ (nhích lên/xuống) để giả lập người dùng đang tập trung đọc 1 đoạn
                while wait_remaining > 0:
                    sleep_chunk = min(wait_remaining, random.uniform(15, 25))
                    time.sleep(sleep_chunk)
                    wait_remaining -= sleep_chunk
                    try:
                        direction = 1 if random.random() > 0.5 else -1
                        driver.execute_script(f"window.scrollBy(0, {direction * random.randint(30, 150)});")
                    except:
                        pass
            
            # Thu thập các thẻ <a> trên trang
            links = driver.find_elements(By.TAG_NAME, 'a')
            found_new_links = []
            
            for link in links:
                try:
                    href = link.get_attribute('href')
                    if href and href.startswith(BASE_URL) and href not in visited:
                        clean_href = href.split('#')[0]
                        # Bỏ qua các link mở app mặc định
                        if 'mailto:' in clean_href or 'tel:' in clean_href:
                            continue
                            
                        if clean_href not in to_visit and clean_href not in visited:
                            found_new_links.append(clean_href)
                except:
                    continue
            
            # Thêm link mới tìm được vào danh sách
            if found_new_links:
                random.shuffle(found_new_links)
                half = len(found_new_links) // 2
                to_visit = found_new_links[:half] + to_visit + found_new_links[half:]
                
        except Exception as e:
            print(f"[{thread_id}] -> Bỏ qua trang do quá tải hoặc lỗi mạng.")
            
        wait_time = random.uniform(2.5, 6.0)
        time.sleep(wait_time)

def run_bot(thread_id):
    driver = None
    try:
        driver = setup_driver()
        print(f"🚀 [{thread_id}] Đã khởi tạo trình duyệt.")
        bot_crawl(driver, thread_id)
        print(f"\n🎉 [{thread_id}] HOÀN TẤT KỊCH BẢN QUÉT!")
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print(f"\n❌ [{thread_id}] Lỗi hệ thống:", e)
    finally:
        if driver:
            try:
                driver.quit()
            except Exception:
                pass

if __name__ == "__main__":
    threads = []
    print("="*50)
    print(f"BẮT ĐẦU CHẠY {NUM_THREADS} LUỒNG - TỐI THIỂU {MIN_TIME_PER_PAGE//60} PHÚT/TRANG")
    print("="*50)
    
    try:
        for i in range(NUM_THREADS):
            thread_id = f"Luồng-{i+1}"
            t = threading.Thread(target=run_bot, args=(thread_id,))
            t.daemon = True
            t.start()
            threads.append(t)
            # Chờ 5 giây trước khi mở luồng tiếp theo để tránh dồn dập
            time.sleep(5) 
            
        # Vòng lặp chờ vô tận để giữ script Python không bị thoát, đồng thời cho phép bắt Ctrl+C
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n🛑 Bot đã nhận lệnh dừng từ người dùng. Đang đóng tất cả các luồng...")
