import MissionCard from "./mission-card";

type MissionProps = {
  missions: {
    text: string;
    link: string;
    status: boolean;
  }[];
};

export default function Mission({ missions }: MissionProps) {
  return (
    <>
      {missions.map((mission, index) => (
        <MissionCard
          key={index}
          text={mission.text}
          link={mission.link}
          status={mission.status}
        />
      ))}
    </>
  );
}
