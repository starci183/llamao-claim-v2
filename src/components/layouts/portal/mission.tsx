import MissionCard from "./mission-card";

type MissionProps = {
  missions: {
    text: string;
    link: string;
    status: boolean;
    type: string;
    clickOnSuccess?: boolean;
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
          clickOnSuccess={mission.clickOnSuccess}
          onClick={() => {
            if (onMissionClick) {
              window.open(mission.link, "_blank");
              onMissionClick(mission.type);
            }
          }}
        />
      ))}
    </>
  );
}
