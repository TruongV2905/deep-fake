export const stats = {
  validSample: 173,
  rawSample: 224,
  socialOver3h: "67.61%",
  hardToDetect: "73.4%",
  trustClearVideo: "39.9%",
  emotionalImpact: "45.1%",
  sharedFake: "37%",
  pauseBeforeShare: "73.4%",
  questionSource: "78%",
  officialPress: "79.8%",
  checkIdentity: "70%",
  reverseSearch: "56.6%",
  lowerVideoTrust: "78%",
  lowerKolTrust: "59%",
  trustOfficial: "84.4%",
  trainingNeed: "96.02%",
};

export const slides = [
  "Cover",
  "Bối cảnh",
  "Câu hỏi nghiên cứu",
  "Khung lý thuyết",
  "Phương pháp",
  "Cảm tính",
  "Lý tính",
  "Thực tiễn",
  "Niềm tin số",
  "Giải pháp 3C",
  "Kết luận",
];

export type DetailContent = {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  metric?: string;
};

export const contextCards: DetailContent[] = [
  {
    id: "ctx-ai",
    title: "AI tạo nội dung siêu thực",
    subtitle: "Bối cảnh công nghệ",
    body: "Deepfake làm mờ ranh giới giữa hiện thực khách quan và bản sao kỹ thuật số. Người xem khó phân biệt tín hiệu thật – giả chỉ dựa trên cảm quan trực tiếp.",
    metric: "AI",
  },
  {
    id: "ctx-youth",
    title: "Nhóm bản địa số 18–25",
    subtitle: "Đối tượng nghiên cứu",
    body: "Nhóm tiếp xúc mạng xã hội liên tục, dễ bị tác động bởi tốc độ lan truyền và định dạng video ngắn gây chú ý.",
    metric: "18–25",
  },
  {
    id: "ctx-social",
    title: "Dùng MXH trên 3 giờ/ngày",
    subtitle: "Mật độ tiếp xúc",
    body: "67.61% đáp viên sử dụng mạng xã hội hơn 3 giờ mỗi ngày — môi trường thuận lợi để tin giả tác động vào nhận thức ban đầu.",
    metric: stats.socialOver3h,
  },
];

export const researchSteps: DetailContent[] = [
  {
    id: "rq-1",
    title: "Deepfake xuất hiện",
    body: "Công nghệ tạo sinh mô phỏng hình ảnh, giọng nói và biểu cảm — biến nội dung giả thành trải nghiệm giác quan gần như thật.",
  },
  {
    id: "rq-2",
    title: "Đánh lừa giác quan",
    body: "Nhận thức cảm tính bị tấn công bằng tín hiệu thị giác và thính giác, khiến 'mắt thấy tai nghe' không còn đủ làm chuẩn xác minh.",
  },
  {
    id: "rq-3",
    title: "Người trẻ phản ứng",
    body: "Hoài nghi, phản tỉnh và thay đổi cách đặt niềm tin khi nhận ra giới hạn của trực quan sinh động.",
  },
  {
    id: "rq-4",
    title: "Xác minh sự thật",
    body: "Thực tiễn số trở thành thước đo kiểm chứng: tra nguồn, đối chiếu báo chí, truy vết kỹ thuật số.",
  },
];

export const theoryItems = [
  {
    title: "Trực quan sinh động",
    summary: "Tiếp nhận trực tiếp qua hình ảnh, âm thanh, cảm xúc ban đầu.",
    detail:
      "Deepfake làm suy yếu tầng nhận thức cảm tính vì cái giả có thể mang hình thức của cái thật. Đây là tầng dễ bị tổn thương nhất trong bối cảnh lan truyền nhanh.",
  },
  {
    title: "Tư duy trừu tượng",
    summary: "Phân tích, hoài nghi, đặt câu hỏi và suy luận logic.",
    detail:
      "Lý tính giúp người trẻ không dừng ở cảm xúc, mà chuyển sang hoài nghi và phân tích bản chất thông tin trước khi hành động.",
  },
  {
    title: "Thực tiễn số",
    summary: "Đối chiếu nguồn, tra vết kỹ thuật, kiểm nghiệm bằng hành động cụ thể.",
    detail:
      "Thực tiễn số là bước quyết định: kiểm chứng bằng báo chí chính thống, danh tính nguồn phát và công cụ truy vết.",
  },
];

export const emotionalStats: DetailContent[] = [
  {
    id: "emo-1",
    title: "Khó phân biệt Deepfake",
    metric: stats.hardToDetect,
    body: "73.4% gặp khó khăn hoặc phân vân khi phân biệt bằng mắt thường và tai nghe — cho thấy cảm tính dễ bị đánh lừa.",
  },
  {
    id: "emo-2",
    title: "Tin video rõ nét",
    metric: stats.trustClearVideo,
    body: "39.9% có xu hướng mặc định tin nội dung hình ảnh, âm thanh rõ nét là thật — heuristic nguy hiểm trong kỷ nguyên deepfake.",
  },
  {
    id: "emo-3",
    title: "Bị tác động cảm xúc",
    metric: stats.emotionalImpact,
    body: "45.1% dễ bị phẫn nộ, thương cảm hoặc tin tưởng bởi video gây sốc trước khi kịp kiểm chứng.",
  },
  {
    id: "emo-4",
    title: "Từng chia sẻ tin giả",
    metric: stats.sharedFake,
    body: "37% đã chia sẻ trước khi nhận ra bản chất sai lệch — hệ quả trực tiếp của phản xạ cảm tính.",
  },
];

export const practiceStats: DetailContent[] = [
  {
    id: "prac-1",
    title: "Tra cứu báo chí chính thống",
    metric: stats.officialPress,
    body: "Đối chiếu thông tin nghi ngờ với nguồn xã hội được công nhận là hành vi kiểm chứng phổ biến nhất.",
  },
  {
    id: "prac-2",
    title: "Kiểm tra danh tính người đăng",
    metric: stats.checkIdentity,
    body: "70% chủ động truy vết ngày đăng, tài khoản và lịch sử phát tán trước khi tin tưởng nội dung.",
  },
  {
    id: "prac-3",
    title: "Dùng công nghệ truy vết",
    metric: stats.reverseSearch,
    body: "56.6% sử dụng tìm kiếm hình ảnh ngược hoặc dữ liệu gốc — thực tiễn số được vật chất hóa bằng công cụ.",
  },
];

export const solutionCards: DetailContent[] = [
  {
    id: "sol-1",
    title: "Check Source",
    metric: "Check",
    body: "Kiểm tra nguồn phát, ngày đăng, danh tính tài khoản và lịch sử kênh trước khi tiếp nhận thông tin.",
  },
  {
    id: "sol-2",
    title: "Cross Check",
    metric: "Cross",
    body: "Đối chiếu nhiều nguồn, ưu tiên báo chí chính thống và cơ quan xác thực để giảm sai lệch.",
  },
  {
    id: "sol-3",
    title: "Counter Act",
    metric: "Counter",
    body: "Report, bình luận cảnh báo và ngăn tin giả lan truyền — chuyển nhận thức cá nhân thành hành động cộng đồng.",
  },
];

export function findDetail(id: string): DetailContent | undefined {
  return [...contextCards, ...researchSteps, ...emotionalStats, ...practiceStats, ...solutionCards].find(
    (item) => item.id === id,
  );
}
