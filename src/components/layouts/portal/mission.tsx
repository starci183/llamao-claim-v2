import MissionCard from "./mission-card";

type MissionProps = {
  missions: {
    text: string;
    link: string;
    status: boolean;
    type: string;
  }[];
  onMissionClick?: (missionType: string) => void;
};

export default function Mission({ missions, onMissionClick }: MissionProps) {
  return (
    <>
      {missions.map((mission, index) => (
        <MissionCard
          key={index}
          text={mission.text}
          link={mission.link}
          status={mission.status}
          onClick={() => {
            if (onMissionClick) {
              if (!mission.status && mission.link) {
                // For incomplete missions, open the link AND update status
                window.open(mission.link, "_blank");
                onMissionClick(mission.type);
              } else {
                onMissionClick(mission.type);
              }
            }
          }}
        />
      ))}
    </>
  );
}
