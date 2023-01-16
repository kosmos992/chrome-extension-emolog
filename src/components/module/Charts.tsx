import { ResponsivePie } from '@nivo/pie';

const Pie = ({ pieData, palette }) => {
  // console.log(pieData);
  return (
    <ResponsivePie
      data={pieData.map(each => {
        each.color = palette[each.code];
        return each;
      })}
      colors={{ datum: 'data.color' }}
      margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
      padAngle={2}
      innerRadius={0.3}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      enableArcLabels={false}
      enableArcLinkLabels={false}
    />
  );
};

export default Pie;
