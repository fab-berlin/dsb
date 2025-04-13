import packageJson from '../../../package.json';

const VersionBadge = () => {
  return <span className={'block text-xs'}>{packageJson.version}</span>;
};

export default VersionBadge;
