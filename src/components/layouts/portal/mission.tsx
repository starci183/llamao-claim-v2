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
            console.log(
              "Mission clicked:",
              mission.type,
              "status:",
              mission.status,
              "link:",
              mission.link,
              "onMissionClick exists:",
              !!onMissionClick
            );
            if (onMissionClick) {
              if (!mission.status && mission.link) {
                // For incomplete missions, open the link AND update status
                console.log("Opening link and calling onMissionClick");
                window.open(mission.link, "_blank");
                onMissionClick(mission.type);
              } else {
                console.log(
                  "Calling onMissionClick only (no link or already completed)"
                );
                onMissionClick(mission.type);
              }
            }
          }}
        />
      ))}
    </>
  );
}
