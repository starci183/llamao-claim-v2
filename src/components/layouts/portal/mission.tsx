import MissionCard from "./mission-card";
import { useRouter } from "next/navigation";

type MissionProps = {
  missions: {
    text: string;
    link: string;
    status: boolean;
  }[];
};

export default function Mission({ missions }: MissionProps) {
  const router = useRouter();
  return (
    <>
      {missions.map((mission, index) => (
        <MissionCard
          key={index}
          text={mission.text}
          link={mission.link}
          status={mission.status}
          onClick={() => {
            if (!mission.status) router.push(mission.link);
          }}
        />
      ))}
    </>
  );
}
