import packageJson from '../../../package.json';

const VersionBadge = () => {
  return <span className={'text-xxs block'}>{packageJson.version}</span>;
};

export default VersionBadge;
