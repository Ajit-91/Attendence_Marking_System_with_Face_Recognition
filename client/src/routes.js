
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import CampaignIcon from '@mui/icons-material/Campaign';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const studentRoutes = [
    {
        path: "/home",
        name: "Home",
        icon: HomeIcon
    },
    {
        path: "/attendence",
        name: "Mark Attendence",
        icon: CoPresentIcon
    },
    {
        path: "/my-attendence",
        name: "My Attendence",
        icon: HistoryIcon
    },
]

const adminRoutes = [
    {
        path: "/announcements",
        name: "Announcements",
        icon: CampaignIcon
    },
    {
        path: "/attendence-code",
        name: "Attendence Code",
        icon: VpnKeyIcon
    },
    {
        path: "/attendence-history",
        name: "All Attendences",
        icon: AnalyticsIcon
    },
]
export {studentRoutes, adminRoutes}