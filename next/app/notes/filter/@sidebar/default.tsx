import { fetchTags } from '@/lib/api';
import SidebarNotes from './SidebarNotes';

const DefaultSidebar = async () => {
  const tags = await fetchTags();

  return <SidebarNotes notes={tags} />;
};

export default DefaultSidebar;
