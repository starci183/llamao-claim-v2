import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";

type ShowcaseLayoutProps = {
  children: React.ReactNode;
};

export default function ShowcaseLayout({ children }: ShowcaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-2">
      <Navbar navbarItems={items} />
      <MainLayout
        headerIcon="/gifs/llamao_majestic_run.gif"
        text="Showcase"
        subHeader={false}
        className="w-full h-full p-3 sm:p-4 lg:p-6"
        wrapperClassName="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl"
      >
        {children}
      </MainLayout>
    </div>
  );
}
