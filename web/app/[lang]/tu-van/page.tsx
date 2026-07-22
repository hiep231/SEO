import { Metadata } from "next";
import Link from "next/link";

import { Locale } from "@repo/types";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

import config from "@/lib/config";
import { localizePath } from "@/lib/i18n";

// ─────────────────────────────────────────────
//  Article data + full content
// ─────────────────────────────────────────────

export const MOCK_ARTICLES = [
	{
		id: 1,
		title: "Top 5 Tai Nghe Bluetooth Đáng Mua Nhất 2026",
		slug: "top-5-tai-nghe-bluetooth-dang-mua-nhat",
		excerpt:
			"Khám phá danh sách 5 mẫu tai nghe Bluetooth nổi bật nhất 2026 – từ chống ồn chủ động, thời lượng pin vượt trội đến chất âm hi-fi. Phù hợp cho cả công việc lẫn giải trí.",
		date: "2026-06-25",
		readTime: "8 phút đọc",
		category: "Tai nghe",
		tags: ["tai nghe bluetooth", "chống ồn", "Sony", "tai nghe không dây 2026"],
		content: `
Trong thời đại làm việc hybrid và giải trí di động, tai nghe Bluetooth không còn là xa xỉ phẩm – đó là công cụ không thể thiếu. Thị trường 2026 bùng nổ với hàng loạt model mới, khiến người mua hoang mang không biết chọn gì.

Bài viết này tổng hợp và đánh giá **5 mẫu tai nghe Bluetooth đáng mua nhất 2026** dựa trên các tiêu chí: chất âm, chống ồn chủ động (ANC), thời lượng pin, thiết kế và giá thành – giúp bạn đưa ra lựa chọn thông minh nhất.

---

## 1. Sony WH-1000XM6 – Vua Chống Ồn Chủ Động

**Giá tham khảo:** 8.990.000 đ

Sony WH-1000XM6 là bản nâng cấp đáng kể so với thế hệ trước. Chip xử lý QN3 thế hệ mới giúp ANC mạnh hơn 30%, lọc bỏ cả những tiếng ồn tần số thấp khó chịu như tiếng động cơ máy bay hay tiếng ồn văn phòng mở.

### Chất âm
Tai nghe trang bị driver 40mm với công nghệ DSEE Extreme – phục hồi chi tiết âm thanh bị mất khi nén file MP3. Bass ấm, treble sáng, mid rõ ràng – phù hợp với mọi thể loại nhạc từ classical đến EDM.

### Pin & Kết nối
- **Pin:** 40 giờ (bật ANC), sạc 3 phút nghe 3 giờ
- **Kết nối:** Bluetooth 5.3, hỗ trợ Multipoint (kết nối 2 thiết bị đồng thời)
- **Codec:** LDAC, AAC, SBC

### Ưu điểm nổi bật
- ANC mạnh nhất phân khúc
- Tự điều chỉnh mức ANC theo môi trường (Adaptive Sound Control)
- Micro 8 lớp lọc gió, chất lượng cuộc gọi xuất sắc

### Nhược điểm
- Vẫn là thiết kế nhựa, chưa premium như Bose
- Giá khá cao so với mặt bằng chung

**Phù hợp với:** Người hay đi máy bay, làm việc nơi ồn ào, cần ANC mạnh và chất âm đa dụng.

---

## 2. Sony WH-1000XM5 – Lựa Chọn "Tính Giá Trị" Tốt Nhất

**Giá tham khảo:** 6.490.000 đ

Kể từ khi XM6 ra mắt, XM5 đã giảm giá đáng kể và trở thành *deal* cực kỳ hấp dẫn. Chất âm vẫn xuất sắc, ANC vẫn thuộc top đầu thị trường.

### So sánh với XM6
| Tiêu chí | XM5 | XM6 |
|---|---|---|
| Giá | ~6.5 triệu | ~9 triệu |
| ANC | Xuất sắc | Tốt hơn 30% |
| Pin ANC | 30 giờ | 40 giờ |
| Gập gọn | Không | Có |

### Tại sao nên chọn XM5 thay XM6?
Nếu bạn không có nhu cầu đặc biệt về ANC cực mạnh và ngân sách hạn chế hơn, XM5 vẫn là tai nghe xuất sắc tuyệt đối. Chênh lệch giá 2.5 triệu đồng có thể mua thêm nhiều thứ hữu ích hơn.

**Phù hợp với:** Người cần tai nghe cao cấp nhưng ngân sách vừa phải, ưu tiên tính giá trị.

---

## 3. Bose QuietComfort Ultra Headphones – Thoải Mái Nhất Khi Đeo

**Giá tham khảo:** 9.490.000 đ

Nếu Sony chiến thắng về chất âm thì Bose vô địch về **độ thoải mái**. Sau nhiều giờ đeo, tai nghe Bose QuietComfort Ultra vẫn không gây khó chịu nhờ đệm tai bằng chất liệu protein leather cao cấp và headband được cân bằng lực tốt.

### Tính năng đặc biệt: Immersive Audio
Bose QuietComfort Ultra hỗ trợ **Immersive Audio** – công nghệ âm thanh không gian giả lập 3D, tạo cảm giác nghe nhạc trong rạp hát. Đây là tính năng ấn tượng nhất của sản phẩm này.

### Chất lượng cuộc gọi
Micro phòng họ đánh giá rất cao Bose về khả năng lọc tiếng ồn khi gọi điện. Dù ngồi giữa quán cafe ồn ào, đầu kia vẫn nghe rõ giọng bạn.

**Phù hợp với:** Người thường xuyên họp online, đeo nhiều giờ liên tục, coi trọng sự thoải mái hơn chất âm thuần túy.

---

## 4. Apple AirPods Max (USB-C) – Sang Trọng Nhất

**Giá tham khảo:** 13.990.000 đ

Nếu bạn đang dùng hệ sinh thái Apple (iPhone, Mac, iPad), AirPods Max là trải nghiệm tích hợp tuyệt vời nhất. Chuyển đổi giữa các thiết bị gần như tức thì, chất âm được Apple Spatial Audio xử lý theo từng nội dung.

### Thiết kế
Khung nhôm nguyên khối, đệm tai memory foam – cảm giác cao cấp không tai nghe nào sánh được. Tuy nhiên, trọng lượng 385g là một điểm trừ đáng kể khi đeo lâu.

### Hạn chế của AirPods Max
- Không gập gọn, túi đựng kỳ lạ và bất tiện
- Chỉ phát huy tối đa trong hệ sinh thái Apple
- Giá thành quá cao so với giá trị thực

**Phù hợp với:** Fan Apple thuần túy, cần tích hợp hoàn hảo với iPhone/Mac/iPad, sẵn sàng chi trả phí "ecosystem premium".

---

## 5. Anker Soundcore Space One Pro – Lựa Chọn Tiết Kiệm Bất Ngờ

**Giá tham khảo:** 1.990.000 đ

Đây là sản phẩm "ngáng cổ" các ông lớn. Anker Soundcore Space One Pro mang ANC decent, pin 40 giờ, thiết kế gọn nhẹ với mức giá chưa đến 2 triệu đồng.

### Chất âm
Nghe nhạc pop, hip-hop, electronic rất thỏa mãn. Bass đủ căng, không bị thiếu sức. Tất nhiên, đặt cạnh Sony XM5 thì vẫn thua về chiều sâu âm trường.

### Pin
40 giờ với ANC bật là con số **vượt trội cả Sony XM6** – một điều khó tin ở tầm giá này.

**Phù hợp với:** Sinh viên, người dùng lần đầu muốn trải nghiệm ANC, ngân sách hạn chế dưới 2 triệu đồng.

---

## Bảng So Sánh Tổng Hợp

| Sản phẩm | Giá | ANC | Pin | Chất âm | Phù hợp |
|---|---|---|---|---|---|
| Sony XM6 | 8.99 tr | ★★★★★ | 40h | ★★★★★ | Mọi đối tượng |
| Sony XM5 | 6.49 tr | ★★★★☆ | 30h | ★★★★★ | Người ưu tiên giá trị |
| Bose QC Ultra | 9.49 tr | ★★★★★ | 24h | ★★★★☆ | Họp online, đeo lâu |
| AirPods Max | 13.99 tr | ★★★★☆ | 20h | ★★★★☆ | Fan Apple |
| Anker Space One Pro | 1.99 tr | ★★★☆☆ | 40h | ★★★☆☆ | Sinh viên, ngân sách thấp |

---

## Kết Luận: Nên Mua Gì?

- **Ngân sách dưới 2 triệu:** Anker Soundcore Space One Pro
- **Ngân sách 6-7 triệu, cần chất âm tốt nhất:** Sony WH-1000XM5
- **Ngân sách trên 9 triệu, cần ANC tốt nhất thị trường:** Sony WH-1000XM6
- **Hay họp online, đeo suốt ngày:** Bose QuietComfort Ultra
- **Dùng iPhone/Mac thuần:** Apple AirPods Max

Dù bạn chọn model nào, hãy đảm bảo mua từ đơn vị chính hãng để được bảo hành đầy đủ. Nếu bạn đang tìm tai nghe Bluetooth Sony hay Anker chính hãng tại Việt Nam, hãy ghé thăm cửa hàng của chúng tôi để được tư vấn trực tiếp.
		`,
	},
	{
		id: 2,
		title: "Hướng Dẫn Chọn Sạc Nhanh Chuẩn GaN Cho iPhone và MacBook",
		slug: "huong-dan-chon-sac-nhanh-chuan-gan",
		excerpt:
			"GaN (Gallium Nitride) đang thay thế silicon truyền thống – giúp củ sạc nhỏ hơn nhưng công suất cao hơn. Tìm hiểu cách chọn củ sạc GaN phù hợp cho iPhone, MacBook và các thiết bị của bạn.",
		date: "2026-06-20",
		readTime: "7 phút đọc",
		category: "Sạc & Pin dự phòng",
		tags: ["sạc nhanh GaN", "củ sạc GaN", "sạc MacBook", "sạc iPhone nhanh", "Anker GaN"],
		content: `
Bạn đang dùng 3-4 củ sạc cục mịch cho các thiết bị khác nhau? Hoặc bực bội vì sạc iPhone mãi không đầy pin dù cắm cả đêm? Đã đến lúc nâng cấp lên **sạc nhanh GaN** – công nghệ đang cách mạng hóa cách chúng ta nạp điện cho thiết bị.

---

## GaN Là Gì? Tại Sao Tốt Hơn Silicon?

**GaN (Gallium Nitride – Gallium Nitrua)** là vật liệu bán dẫn thế hệ mới, vượt trội so với silicon truyền thống về nhiều mặt:

| Tiêu chí | Silicon (cũ) | GaN (mới) |
|---|---|---|
| Điện trở | Cao | Thấp hơn 3 lần |
| Tản nhiệt | Kém | Tốt hơn |
| Kích thước | To, nặng | Nhỏ gọn hơn 30-50% |
| Hiệu suất chuyển đổi | ~85% | ~95%+ |
| Nhiệt độ hoạt động | Cao | Thấp hơn |

**Kết quả thực tế:** Một củ sạc GaN 65W có thể nhỏ bằng củ sạc silicon 30W, nhưng sạc nhanh gấp đôi và ít nóng hơn nhiều.

---

## Các Chuẩn Sạc Nhanh Cần Biết

Trước khi mua, bạn cần hiểu các chuẩn sạc để tránh mua nhầm:

### USB Power Delivery (USB-PD)
Đây là chuẩn sạc nhanh phổ quát nhất, được Apple, Samsung, Google, Lenovo... đều hỗ trợ. Nếu thiết bị của bạn dùng cổng USB-C, nhiều khả năng nó hỗ trợ USB-PD.

- **iPhone 15+:** Hỗ trợ USB-PD tới 27W
- **MacBook Air M3:** Hỗ trợ USB-PD tới 70W
- **MacBook Pro 14":** Hỗ trợ USB-PD tới 96W (sạc nhanh) hoặc 140W (sạc đầy nhanh)

### Qualcomm Quick Charge (QC)
Chuẩn riêng của Qualcomm, dùng cho các điện thoại Android chip Snapdragon. Nếu bạn dùng Samsung Galaxy, Xiaomi, OPPO... kiểm tra xem hỗ trợ QC phiên bản nào (QC 3.0, 4.0, 4.0+, 5.0).

### Apple MagSafe
Sạc không dây 15W dành riêng cho iPhone 12+. Cần adapter hỗ trợ USB-PD 20W trở lên để đạt tốc độ tối đa.

---

## Cách Chọn Củ Sạc GaN Phù Hợp

### Bước 1: Xác Định Thiết Bị và Nhu Cầu

**Chỉ sạc iPhone:**
- Dùng củ sạc 20W USB-PD là đủ (iPhone 15 tối đa 27W, nhưng 20W đã sạc từ 0→50% trong 30 phút)
- Gợi ý: Anker 521 Charger Nano (20W), Ugreen 30W GaN

**iPhone + AirPods/Apple Watch:**
- Cần ít nhất 2 cổng, 30-45W
- Gợi ý: Anker 622 Magnetic Charger (với MagSafe built-in), Ugreen 45W 2-cổng GaN

**MacBook Air (M-series):**
- Cần tối thiểu 45W để sạc bình thường, 65W để sạc nhanh
- Gợi ý: Anker 735 Charger (65W), Ugreen CD226 GaN 65W

**MacBook Pro 14" / 16":**
- Tối thiểu 65W, lý tưởng 100W để sạc nhanh khi đang dùng
- Gợi ý: Anker Prime 100W, Ugreen Nexode 100W

**Sạc tất cả thiết bị cùng lúc (laptop + 2 điện thoại):**
- Cần củ sạc 65-100W với 3+ cổng
- Gợi ý: Ugreen DigiNest 65W (3C1A), Anker Prime 240W Desktop Charger

### Bước 2: Chú Ý Tính Năng "Power Sharing"

Nhiều củ sạc GaN đa cổng sẽ **chia sẻ công suất** giữa các cổng. Ví dụ:
- Anker 65W 3-cổng: Khi dùng 1 cổng → 65W; Khi dùng 3 cổng → mỗi cổng chỉ còn ~25W

Hãy đọc kỹ thông số trước khi mua nếu bạn cần sạc laptop cùng lúc với điện thoại.

### Bước 3: Chọn Thương Hiệu Uy Tín

Với sạc GaN, đừng ham rẻ – củ sạc kém chất lượng có thể gây hại cho pin thiết bị hoặc nguy hiểm cháy nổ.

**Thương hiệu đáng tin cậy:**
- **Anker:** Thương hiệu Mỹ, chất lượng kiểm soát chặt, bảo hành tốt, giá hợp lý
- **Ugreen:** Thương hiệu Trung Quốc nhưng uy tín, kiểm định bởi các tổ chức độc lập (CE, FCC, UL)
- **Belkin:** Cao cấp, được Apple chứng nhận MFi, giá cao hơn nhưng an tâm tuyệt đối
- **Spigen, ESR:** Mid-range, giá thành tốt, chất lượng ổn

---

## Top Củ Sạc GaN Đáng Mua Nhất 2026

### 🥇 Anker Prime 100W (3 cổng: 2C + 1A)
- **Giá:** ~1.490.000 đ
- **Đặc điểm:** Màn hình LED hiển thị công suất thực tế, ứng dụng quản lý qua Bluetooth
- **Phù hợp:** MacBook Pro + iPhone + tai nghe

### 🥈 Ugreen Nexode 65W (2C + 1A)
- **Giá:** ~690.000 đ
- **Đặc điểm:** Nhỏ gọn, giá tốt, sạc MacBook Air ổn định
- **Phù hợp:** MacBook Air M2/M3 + iPhone

### 🥉 Anker Nano II 65W (1C)
- **Giá:** ~590.000 đ  
- **Đặc điểm:** Siêu nhỏ gọn (chỉ to hơn củ sạc iPhone một chút), 1 cổng USB-C
- **Phù hợp:** MacBook Air khi đi du lịch, cần gọn nhẹ tối đa

### Lựa chọn tầm trung: Ugreen CD319 30W
- **Giá:** ~390.000 đ
- **Đặc điểm:** Cổng USB-C 30W + USB-A 22.5W, sạc iPhone cực nhanh
- **Phù hợp:** Chỉ cần sạc điện thoại + 1 thiết bị nhỏ, ngân sách tiết kiệm

---

## Lưu Ý Khi Mua Sạc GaN

1. **Kiểm tra cáp sạc:** Củ sạc GaN 100W nhưng dùng cáp rẻ tiền không hỗ trợ 5A sẽ chỉ sạc được 60W. Hãy dùng cáp **USB-C to USB-C 5A** chính hãng đi kèm hoặc mua cáp tốt.

2. **Không cần mua "overkill":** iPhone sạc tối đa 27W – mua củ 100W không giúp sạc nhanh hơn, chỉ tốn tiền thêm. Trừ khi bạn cần đa dụng cho nhiều thiết bị.

3. **Kiểm tra bảo hành:** Hầu hết thương hiệu uy tín bảo hành 18-24 tháng. Tránh hàng không rõ nguồn gốc.

4. **Mua đủ cáp:** Nếu mua củ 3 cổng, đảm bảo bạn có đủ cáp tốt cho từng thiết bị.

---

## Kết Luận

Sạc GaN là một trong những nâng cấp "thực dụng" nhất bạn có thể làm cho bộ phụ kiện của mình. Chỉ với 500.000 – 1.500.000 đồng, bạn loại bỏ được đống dây rối, sạc nhanh hơn và ít lo về nhiệt độ hơn.

Nếu bạn đang dùng iPhone hoặc MacBook, **Anker và Ugreen là hai thương hiệu không thể bỏ qua**. Xem thêm các sản phẩm sạc nhanh GaN chính hãng tại cửa hàng của chúng tôi để được tư vấn lựa chọn phù hợp nhất với nhu cầu.
		`,
	},
	{
		id: 3,
		title: "Bàn Phím Cơ Custom: Bắt Đầu Từ Đâu?",
		slug: "ban-phim-co-custom-bat-dau-tu-dau",
		excerpt:
			"Thế giới bàn phím cơ custom đang ngày càng thu hút cộng đồng công nghệ Việt Nam. Bài viết này giải thích tất cả: switch, keycap, layout, mod – và cách bắt đầu mà không \"cháy túi\".",
		date: "2026-06-15",
		readTime: "10 phút đọc",
		category: "Bàn phím & Chuột",
		tags: ["bàn phím cơ", "custom keyboard", "switch bàn phím", "keycap", "bàn phím cơ không dây"],
		content: `
Lần đầu nghe tiếng *thock thock* từ bàn phím cơ của người ngồi cạnh, bạn có thể chỉ tò mò. Nhưng sau khi tự mình gõ thử, nhiều người đã bị cuốn vào một trong những "sở thích tốn tiền" thú vị nhất của giới tech: **custom mechanical keyboard**.

Bài viết này dành cho người mới hoàn toàn – chưa biết gì về bàn phím cơ nhưng muốn hiểu rõ trước khi xuống tiền.

---

## Tại Sao Nên Dùng Bàn Phím Cơ?

### So với bàn phím membrane (màng) thông thường:

| Tiêu chí | Membrane | Mechanical |
|---|---|---|
| Cảm giác gõ | Xốp, không rõ ràng | Rõ ràng, tactile feedback |
| Độ bền | 5-10 triệu lần gõ | 50-100 triệu lần gõ |
| Customization | Gần như không | Vô hạn |
| Âm thanh | Xẹt, không hay | Có thể điều chỉnh |
| Giá | Rẻ | Cao hơn (nhưng bền hơn) |

Bàn phím cơ **không chỉ là "đánh cho sướng tay"** – nhiều lập trình viên, nhà văn, game thủ chọn bàn phím cơ vì năng suất làm việc thực sự tăng lên khi gõ ít mắc lỗi hơn và ít mỏi tay hơn.

---

## Giải Thích Các Thuật Ngữ Cơ Bản

### 1. Switch (Công tắc)

Switch là linh hồn của bàn phím cơ, quyết định 70% cảm giác gõ. Có 3 loại chính:

#### 🔴 Linear Switch (Tuyến tính)
- Đi xuống **mượt mà, đều đặn**, không có điểm kích hoạt rõ ràng
- Tiêu biểu: **Cherry MX Red**, **Gateron Yellow**, **Akko CS Jelly**
- Phù hợp: Game thủ (nhấn nhanh), người gõ yên tĩnh

#### 🟤 Tactile Switch (Xúc giác)
- Có **bump (gờ)** nhỏ ở điểm kích hoạt – bạn *cảm nhận được* khi phím được đăng ký
- Tiêu biểu: **Cherry MX Brown**, **Gateron Brown**, **Boba U4**
- Phù hợp: Người vừa gõ văn bản vừa chơi game, office worker

#### 🔵 Clicky Switch (Có tiếng click)
- Có bump + tiếng **click rõ ràng** ở điểm kích hoạt
- Tiêu biểu: **Cherry MX Blue**, **Razer Green**, **Kailh Box White**
- Phù hợp: Người thích phản hồi âm thanh, KHÔNG phù hợp nơi làm việc chung

> **Lời khuyên cho người mới:** Bắt đầu với **Gateron Yellow** (linear) hoặc **Gateron Brown** (tactile) – giá rẻ, chất lượng ổn, dễ tìm mua tại Việt Nam.

### 2. Layout (Kích thước bàn phím)

| Layout | Tên gọi | Số phím | Đặc điểm |
|---|---|---|---|
| 100% | Full-size | ~104 phím | Đầy đủ nhất, numpad |
| 80% / TKL | Tenkeyless | ~87 phím | Bỏ numpad, compact hơn |
| 75% | 75% | ~84 phím | Có mũi tên, rất compact |
| 65% | 65% | ~68 phím | Không F-key, compact cực |
| 60% | 60% | ~61 phím | Nhỏ nhất phổ biến, cần layer |
| 40% | 40% | <50 phím | Cho người rất thích compact |

**Gợi ý cho người mới:** Bắt đầu với **75% hoặc TKL** – đủ phím chức năng nhưng không chiếm quá nhiều diện tích bàn.

### 3. Keycap (Nắp phím)

Keycap ảnh hưởng đến thẩm mỹ và cảm giác gõ. Hai thông số quan trọng:

**Profile (Độ cao và hình dạng):**
- **OEM:** Profile cao, là default của hầu hết bàn phím thông thường
- **Cherry:** Thấp hơn OEM một chút, phổ biến nhất trong cộng đồng custom
- **SA:** Cao nhất, cong tròn, cảm giác vintage
- **DSA/XDA:** Thấp, phẳng, dễ gõ không cần nhìn vị trí

**Chất liệu:**
- **ABS (Acrylonitrile Butadiene Styrene):** Rẻ hơn, dễ bị bóng theo thời gian (shinning)
- **PBT (Polybutylene Terephthalate):** Bền hơn, không bị bóng, cảm giác gõ tốt hơn – nên chọn

### 4. PCB, Plate và Case

- **PCB (Printed Circuit Board):** Mạch điện tử. Loại hot-swap PCB cho phép thay switch không cần hàn.
- **Plate:** Tấm giữ switch, ảnh hưởng lớn đến âm thanh. Nhôm → cứng, ngân; Polycarbonate → mềm, thock hơn.
- **Case (Vỏ):** Nhựa rẻ nhất, nhôm trung cấp, resin/brass/carbon fiber cao cấp.

---

## Hành Trình Custom Keyboard: 3 Mức Ngân Sách

### 🟢 Entry Level: 1.000.000 – 2.500.000 đ
**Mục tiêu:** Trải nghiệm bàn phím cơ lần đầu mà không mạo hiểm quá nhiều tiền.

**Gợi ý:**
- **Akko 3087 DS** (~1.200.000 đ): Đầy đủ layout, switch tốt, có thể swap keycap dễ
- **AKKO 5075B Plus** (~1.800.000 đ): Hot-swap, wireless Bluetooth + 2.4GHz, RGB
- **E-Dra EK368RT** (~1.500.000 đ): Made in Vietnam, chất lượng ổn, dễ mua bảo hành

### 🟡 Mid Range: 2.500.000 – 5.000.000 đ
**Mục tiêu:** Trải nghiệm "endgame-lite" – chất âm tốt, cảm giác gõ rõ ràng, có thể mod thêm.

**Gợi ý:**
- **Keychron Q2 Pro (~3.500.000 đ):** Case nhôm nguyên khối, gasket mount, wireless, tuyệt vời
- **ASUS ROG Strix Scope II X (~3.800.000 đ):** Build premium, RGB đẹp, switch ROG NX
- **Logitech G715 (~2.800.000 đ):** Trải nghiệm mainstream cao cấp, đáng tin cậy

### 🔴 High End: 5.000.000 đ+
**Mục tiêu:** Xây dựng bàn phím theo sở thích cá nhân từng chi tiết.

Ở mức này, bạn sẽ mua:
- Case nhôm/resin riêng (2-5 triệu)
- PCB hot-swap riêng (500k-1.5 triệu)
- Switch tốt hơn (Gateron G Pro 3.0, Akko CS Lavender) (~300-800k/bộ)
- Keycap PBT chất lượng cao (500k-2 triệu)
- Lube switch + foam mod (~200-500k công cụ + vật liệu)

---

## Các Mod Phổ Biến Để Cải Thiện Âm Thanh

### 1. Lube Switch (Bôi trơn công tắc)
Bôi dầu Krytox 205g0 (linear) hoặc Tribosys 3203 (tactile) vào switch giúp gõ **mượt hơn, ít ồn hơn**.

### 2. Band-Aid Mod
Dán miếng dán Band-Aid lên PCB dưới vị trí stabilizer – giảm tiếng clunk của spacebar và các phím lớn.

### 3. Foam Mod (Case Foam)
Nhét foam mỏng vào bên trong case để giảm tiếng vang rỗng ("hollow sound"), làm âm thanh đặc hơn.

### 4. Gasket Mounting
Thiết kế mounting cao cấp – PCB/plate được giữ bởi gioăng cao su thay vì ốc vít cứng, tạo cảm giác gõ "bouncy", âm thanh thicker hơn. Nhiều bàn phím cao cấp đã tích hợp sẵn (Keychron Q series).

---

## Cộng Đồng & Nơi Mua Sắm Uy Tín Tại Việt Nam

### Cộng đồng online:
- **Group Facebook "Bàn phím cơ Việt Nam"** – nơi chia sẻ, hỏi đáp, mua bán
- **Reddit r/MechanicalKeyboards** – cộng đồng quốc tế, nhiều review chuyên sâu

### Mua keycap / switch:
- Lazada, Shopee (hàng chính hãng từ các shop uy tín)
- GearVN, Hnam Mobile (bàn phím cơ thương hiệu)
- Cửa hàng phụ kiện công nghệ chính hãng (như MiniSetup)

---

## Kết Luận: Lộ Trình Cho Người Mới

1. **Bước 1:** Thử gõ tại cửa hàng hoặc mượn bàn phím cơ của bạn bè để cảm nhận loại switch
2. **Bước 2:** Mua bàn phím cơ Entry Level (Akko, E-Dra) để xác nhận bạn thực sự thích cảm giác này
3. **Bước 3:** Tìm hiểu cộng đồng, xem YouTube về mod và custom
4. **Bước 4:** Nâng cấp dần khi đã hiểu rõ mình muốn gì

Đừng vội xuống tiền cho bàn phím custom 5-10 triệu ngay khi mới bắt đầu. Hãy đi từng bước – đó mới là cách tận hưởng thế giới custom keyboard một cách trọn vẹn nhất.

Xem các mẫu bàn phím cơ không dây AKKO, Logitech, ASUS chính hãng tại cửa hàng của chúng tôi – đội ngũ tư vấn luôn sẵn sàng giúp bạn chọn được chiếc bàn phím phù hợp nhất!
		`,
	},
];

export async function generateStaticParams() {
	return MOCK_ARTICLES.map((article) => ({
		slug: article.slug,
	}));
}

// ─────────────────────────────────────────────
//  Blog index page
// ─────────────────────────────────────────────

export const metadata: Metadata = {
	title: `Tư Vấn & Đánh Giá Phụ Kiện Công Nghệ | ${config.websiteName}`,
	description:
		"Cẩm nang mua sắm phụ kiện công nghệ: đánh giá tai nghe Bluetooth, hướng dẫn chọn sạc GaN, bàn phím cơ custom và nhiều hơn nữa từ các chuyên gia.",
	keywords: [
		"tư vấn phụ kiện công nghệ",
		"đánh giá tai nghe bluetooth",
		"chọn sạc GaN",
		"bàn phím cơ",
		"hướng dẫn mua phụ kiện",
	],
};

interface Props {
	params: Promise<{ lang: Locale }>;
}

export default async function BlogIndexPage({ params }: Props) {
	const { lang } = await params;

	return (
		<main className="bg-background min-h-screen py-8">
			<Container>
				<Section>
					{/* Header */}
					<div className="mb-12 text-center">
						<h1 className="text-4xl font-bold mb-4">Tư Vấn Công Nghệ</h1>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Cẩm nang hướng dẫn mua sắm, mẹo sử dụng và tin tức công nghệ mới nhất từ đội ngũ chuyên gia của chúng tôi.
						</p>
					</div>

					{/* Article grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{MOCK_ARTICLES.map((article) => (
							<article
								key={article.id}
								className="border rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 bg-card group"
							>
								{/* Category badge */}
								<div className="px-6 pt-6">
									<span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
										{article.category}
									</span>
								</div>

								<div className="px-6 pb-6 flex flex-col flex-1">
									<h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
										<Link href={localizePath(`/tu-van/${article.slug}`, lang)}>
											{article.title}
										</Link>
									</h2>

									<p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
										{article.excerpt}
									</p>

									{/* Tags */}
									<div className="flex flex-wrap gap-1 mb-4">
										{article.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className="text-xs text-muted-foreground border rounded px-2 py-0.5"
											>
												#{tag}
											</span>
										))}
									</div>

									{/* Footer */}
									<div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4 mt-auto">
										<span>{article.date}</span>
										<span>{article.readTime}</span>
									</div>
								</div>
							</article>
						))}
					</div>
				</Section>
			</Container>
		</main>
	);
}
