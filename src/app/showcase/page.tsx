import MainLayout from "@/components/layouts/main-layout";

export default function Showcase() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MainLayout
        headerIcon="/gifs/llamao_majestic_run.gif"
        text="Showcase"
        subHeader={false}
      ></MainLayout>
    </div>
  );
}
