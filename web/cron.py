import os
import sys
import time
import subprocess
from datetime import datetime

# Cấu hình thời gian
INTERVAL_MINUTES = 5      # Mỗi lần cách nhau 5 phút
TOTAL_DURATION_MINUTES = 60 # Chạy tối đa trong 60 phút
TOTAL_RUNS = TOTAL_DURATION_MINUTES // INTERVAL_MINUTES

print("=" * 50)
print("KHỞI ĐỘNG CHẾ ĐỘ CHẠY TỰ ĐỘNG (CRON BOT)")
print(f"- Thời gian nghỉ giữa các lần: {INTERVAL_MINUTES} phút")
print(f"- Tổng thời gian hoạt động: {TOTAL_DURATION_MINUTES} phút")
print(f"- Tổng số vòng lặp dự kiến: {TOTAL_RUNS} lần")
print("=" * 50)

try:
    for i in range(1, TOTAL_RUNS + 1):
        current_time = datetime.now().strftime('%H:%M:%S')
        print(f"\n[{current_time}] ---> BẮT ĐẦU VÒNG LẶP THỨ {i}/{TOTAL_RUNS} <---")
        
        # Kích hoạt script lướt web (sử dụng sys.executable để đảm bảo dùng đúng phiên bản Python hiện tại)
        try:
            subprocess.run([sys.executable, "track.py"], check=True)
        except subprocess.CalledProcessError as e:
            print(f"[LỖI] Vòng lặp {i} gặp sự cố khi chạy track.py. Mã lỗi: {e.returncode}")
        except Exception as e:
            print(f"[LỖI NGHIÊM TRỌNG] Không thể chạy track.py: {e}")
        
        if i < TOTAL_RUNS:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Đã xong vòng {i}. Đang ngủ đông {INTERVAL_MINUTES} phút chờ vòng tiếp theo...")
            # Tạm dừng chương trình (quy đổi phút sang giây)
            time.sleep(INTERVAL_MINUTES * 60)
        else:
            print(f"\n[{datetime.now().strftime('%H:%M:%S')}] ĐÃ HOÀN THÀNH ĐỦ {TOTAL_RUNS} VÒNG. BOT TỰ ĐỘNG KẾT THÚC!")
except KeyboardInterrupt:
    print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 🛑 ĐÃ NHẬN LỆNH DỪNG TỪ NGƯỜI DÙNG (Ctrl+C). ĐANG THOÁT...")
    sys.exit(0)
