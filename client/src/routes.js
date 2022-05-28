import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const studentRoutes = [
    {
        path: "/home",
        name: "Home",
        icon: HomeIcon
    },
    {
        path: "/attendence",
        name: "Mark Attendence",
        icon: CloudUploadIcon
    },
    {
        path: "/my-attendence",
        name: "My Attendence",
        icon: CloudUploadIcon
    },
]

const adminRoutes = [
    {
        path: "/announcements",
        name: "Announcements",
        icon: AdminPanelSettingsIcon
    },
    {
        path: "/attendence-code",
        name: "Attendence Code",
        icon: AdminPanelSettingsIcon
    },
    {
        path: "/attendence-history",
        name: "All Attendences",
        icon: AdminPanelSettingsIcon
    },
]
export {studentRoutes, adminRoutes}