import type { RefObject } from "react";
import {
  Award,
  BarChart2,
  BookOpen,
  CheckCircle,
  Eye,
  Filter,
  RefreshCw,
  Shield,
} from "lucide-react";
import {
  contextCards,
  emotionalStats,
  practiceStats,
  researchSteps,
  solutionCards,
  stats,
  theoryItems,
  type DetailContent,
} from "../data/presentationData";
import { slideVisuals } from "../data/slideVisuals";
import { cn } from "../lib/cn";
import { HeroImage, QuoteBlock, ResearchCard } from "./ui/ContentBlocks";
import { ProgressBar } from "./ui/ProgressBar";
import { SectionTitle } from "./ui/SectionTitle";
import { StatCard } from "./ui/StatCard";

type SlideContentProps = {
  currentSlide: number;
  activeTheory: number;
  onTheorySelect: (index: number) => void;
  filterTarget: boolean;
  setFilterTarget: (v: boolean) => void;
  filterDeepfake: boolean;
  setFilterDeepfake: (v: boolean) => void;
  filteredSample: number;
  filterCountRef: RefObject<HTMLDivElement | null>;
  theoryPanelRef: RefObject<HTMLDivElement | null>;
  onOpenDetail: (detail: DetailContent) => void;
  heroImageRef: RefObject<HTMLDivElement | null>;
};

export function SlideContent({
  currentSlide,
  activeTheory,
  onTheorySelect,
  filterTarget,
  setFilterTarget,
  filterDeepfake,
  setFilterDeepfake,
  filteredSample,
  filterCountRef,
  theoryPanelRef,
  onOpenDetail,
  heroImageRef,
}: SlideContentProps) {
  const visual = slideVisuals[currentSlide];

  return (
    <>
      {currentSlide === 0 && (
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="space-y-6 md:space-y-8">
            <span
              data-reveal="hero"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
            >
              <BookOpen className="h-3.5 w-3.5" /> Báo cáo nghiên cứu triết học
            </span>
            <h1
              data-reveal="hero"
              className="text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-[3.5rem]"
            >
              Deepfake &<br />
              Khủng hoảng niềm tin số
            </h1>
            <p
              data-reveal="item"
              className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
            >
              Vận dụng Nhận thức luận Mác – Lênin để phân tích sự chuyển hóa từ
              cảm tính, lý tính đến thực tiễn số.
            </p>
            <div data-reveal="item" className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-primary)]">
                N = {stats.validSample}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-primary)]">
                18–25 tuổi · TP.HCM
              </span>
            </div>
          </div>
          <HeroImage
            imageRef={heroImageRef}
            src={visual.image}
            alt={visual.alt}
            caption="Mắt thấy tai nghe — không còn là chuẩn chân lý tuyệt đối"
          />
        </div>
      )}

      {currentSlide === 1 && (
        <div className="space-y-8 md:space-y-10">
          <SectionTitle
            kicker="Bối cảnh đề tài"
            title="Vì sao cần nghiên cứu Deepfake?"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {contextCards.map((card) => (
              <StatCard
                key={card.id}
                value={card.metric ?? ""}
                label={card.title}
                note={card.body.slice(0, 90) + "…"}
                detail={card}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
          <QuoteBlock>
            “Khi mắt thấy tai nghe không còn đáng tin, con người dựa vào đâu để
            tìm ra chân lý?”
          </QuoteBlock>
        </div>
      )}

      {currentSlide === 2 && (
        <div className="space-y-8 md:space-y-10">
          <SectionTitle kicker="Mắt xích tư duy" title="Câu hỏi nghiên cứu" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {researchSteps.map((step, i) => (
              <ResearchCard
                key={step.id}
                index={i}
                detail={step}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        </div>
      )}

      {currentSlide === 3 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Triết học ứng dụng"
            title="Khung lý thuyết Mác – Lênin"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {theoryItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                data-reveal="item"
                data-hover="card"
                onClick={() => onTheorySelect(index)}
                className={cn(
                  "rounded-2xl p-5 text-left sm:p-6",
                  activeTheory === index
                    ? "surface-elevated ring-1 ring-[var(--accent)]/40"
                    : "surface-card",
                )}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)]">
                  {index === 0 ? (
                    <Eye className="h-4 w-4" />
                  ) : index === 1 ? (
                    <BookOpen className="h-4 w-4" />
                  ) : (
                    <Award className="h-4 w-4" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.summary}
                </p>
              </button>
            ))}
          </div>
          <div
            ref={theoryPanelRef}
            className="surface-elevated rounded-2xl p-5 text-sm leading-relaxed text-[var(--text-secondary)] sm:p-7 sm:text-base"
          >
            {theoryItems[activeTheory].detail}
          </div>
        </div>
      )}

      {currentSlide === 4 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Phương pháp nghiên cứu"
            title="Từ 224 phiếu về N = 173 mẫu hợp lệ"
          />
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
            <div
              data-reveal="item"
              className="surface-card space-y-3 rounded-2xl p-5 sm:space-y-4 sm:p-7"
            >
              <label className="flex cursor-pointer gap-3 rounded-xl border border-transparent p-4 transition-colors hover:border-white/10 hover:bg-white/[0.03] sm:gap-4">
                <input
                  type="checkbox"
                  checked={filterTarget}
                  onChange={(e) => setFilterTarget(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                />
                <div>
                  <div className="text-sm font-medium text-[var(--text-primary)] sm:text-base">
                    Lọc đối tượng 18–25 tuổi và đang ở TP.HCM
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Sàng lọc theo Câu 1 và Câu 2.
                  </p>
                </div>
              </label>
              <label className="flex cursor-pointer gap-3 rounded-xl border border-transparent p-4 transition-colors hover:border-white/10 hover:bg-white/[0.03] sm:gap-4">
                <input
                  type="checkbox"
                  checked={filterDeepfake}
                  onChange={(e) => setFilterDeepfake(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                />
                <div>
                  <div className="text-sm font-medium text-[var(--text-primary)] sm:text-base">
                    Chỉ giữ đáp viên đã biết khái niệm Deepfake
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Sàng lọc theo Câu 3.
                  </p>
                </div>
              </label>
              <p className="text-sm text-[var(--text-muted)]">
                Tổng phiếu thu về 224; sau sàng lọc thu được 173 mẫu hợp lệ.
              </p>
            </div>
            <div
              data-reveal="item"
              data-hover="card"
              className="surface-elevated flex flex-col items-center justify-center rounded-2xl p-8 sm:p-10"
            >
              <Filter className="mb-4 h-9 w-9 text-[var(--accent)]" />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Mẫu phân tích
              </p>
              <div
                ref={filterCountRef}
                className="mt-2 text-5xl font-semibold text-[var(--text-primary)] sm:text-6xl"
              >
                {filteredSample}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm text-[var(--text-secondary)]">
                {filteredSample === 173 ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                )}
                {filteredSample === 173 ? "Đạt N = 173" : "Đang lọc dữ liệu"}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSlide === 5 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Kết quả 1"
            title="Nhận thức cảm tính dễ bị đánh lừa"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {emotionalStats.map((item) => (
              <StatCard
                key={item.id}
                value={item.metric ?? ""}
                label={item.title}
                note={item.body.slice(0, 72) + "…"}
                counter={Number.parseFloat(
                  (item.metric ?? "0").replace("%", ""),
                )}
                suffix={(item.metric ?? "").includes("%") ? "%" : ""}
                detail={item}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
          <QuoteBlock>
            Deepfake vô hiệu hóa “trực quan sinh động” bằng cách giả lập tín
            hiệu giác quan giống thật.
          </QuoteBlock>
        </div>
      )}

      {currentSlide === 6 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Kết quả 2"
            title="Lý tính trỗi dậy khi cảm tính bị khủng hoảng"
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:gap-6">
            <div
              data-reveal="item"
              className="surface-card space-y-5 rounded-2xl p-6 sm:p-8"
            >
              <ProgressBar
                label="Dừng lại suy nghĩ trước khi chia sẻ"
                value={stats.pauseBeforeShare}
              />
              <ProgressBar
                label="Đặt câu hỏi về nguồn gốc thông tin"
                value={stats.questionSource}
              />
              <ProgressBar
                label="Tìm báo chí chính thống để đối chiếu"
                value={stats.officialPress}
              />
            </div>
            <div
              data-reveal="item"
              data-hover="card"
              className="surface-elevated flex flex-col justify-center rounded-2xl p-6 sm:p-8"
            >
              <BarChart2 className="mb-4 h-10 w-10 text-[var(--accent)]" />
              <h3 className="text-xl font-medium text-[var(--text-primary)] sm:text-2xl">
                Từ phản xạ sang phản biện
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Người trẻ không chỉ tiếp nhận thông tin, mà bắt đầu phân tích,
                nghi ngờ và kiểm tra logic nguồn tin.
              </p>
            </div>
          </div>
        </div>
      )}

      {currentSlide === 7 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Tiêu chuẩn chân lý"
            title="Thực tiễn số là bước kiểm chứng quyết định"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {practiceStats.map((item) => (
              <StatCard
                key={item.id}
                value={item.metric ?? ""}
                label={item.title}
                note={item.body.slice(0, 80) + "…"}
                counter={Number.parseFloat(
                  (item.metric ?? "0").replace("%", ""),
                )}
                suffix="%"
                detail={item}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
          <QuoteBlock>
            Lý tính cần được “vật chất hóa” thành hành động kiểm chứng cụ thể
            thì mới tiến gần đến chân lý.
          </QuoteBlock>
        </div>
      )}

      {currentSlide === 8 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Hệ quả"
            title="Khủng hoảng niềm tin số và tái cấu trúc niềm tin"
          />
          <div
            data-reveal="item"
            className="surface-card space-y-5 rounded-2xl p-6 sm:space-y-6 sm:p-8"
          >
            <ProgressBar
              label="Sụt giảm niềm tin vào video trên mạng"
              value={stats.lowerVideoTrust}
            />
            <ProgressBar
              label="Hoài nghi thông tin từ KOLs/tài khoản cá nhân"
              value={stats.lowerKolTrust}
            />
            <ProgressBar
              label="Tin tưởng báo chí chính thống và cơ quan xác thực"
              value={stats.trustOfficial}
            />
          </div>
        </div>
      )}

      {currentSlide === 9 && (
        <div className="space-y-6 md:space-y-8">
          <SectionTitle
            kicker="Đề xuất"
            title="Mô hình 3C bảo vệ không gian nhận thức số"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {solutionCards.map((item) => (
              <StatCard
                key={item.id}
                value={item.metric ?? ""}
                label={item.title}
                note={item.body.slice(0, 80) + "…"}
                detail={item}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
          <div
            data-reveal="item"
            className="surface-elevated flex items-start gap-4 rounded-2xl p-5 sm:p-7"
          >
            <Shield className="mt-1 hidden h-8 w-8 shrink-0 text-[var(--accent)] sm:block" />
            <p className="text-base leading-relaxed text-[var(--text-primary)] sm:text-lg">
              Lên tới{" "}
              <span data-counter={96.02} data-suffix="%">
                0%
              </span>{" "}
              đáp viên có nhu cầu học kỹ năng nhận diện Deepfake và kiểm chứng
              tin giả.
            </p>
          </div>
        </div>
      )}

      {currentSlide === 10 && (
        <div className="mx-auto max-w-3xl space-y-8 text-center md:space-y-10">
          <SectionTitle
            kicker="Kết luận"
            title="Khép lại vòng lặp nhận thức số"
            align="center"
          />
          <div
            data-reveal="item"
            data-hover="card"
            className="surface-elevated rounded-2xl p-7 sm:p-10"
          >
            <p className="text-xl font-medium leading-relaxed text-[var(--text-primary)] sm:text-2xl">
              Deepfake khiến “mắt thấy tai nghe” không còn đủ để xác định sự
              thật khách quan.
            </p>
            <div className="mx-auto my-6 h-px w-16 bg-white/15 sm:my-8" />
            <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Chỉ khi chuyển từ{" "}
              <span className="text-[var(--text-primary)]">
                Cảm tính → Lý tính → Thực tiễn số
              </span>
              , người dùng mới có thể bảo vệ chân lý và tái lập niềm tin số.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
