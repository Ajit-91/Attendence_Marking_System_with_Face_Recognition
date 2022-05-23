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
        name: "Attendence",
        icon: CloudUploadIcon
    },
]

const adminRoutes = [
    {
        path: "/admin-panel",
        name: "Admin Panel",
        icon: AdminPanelSettingsIcon
    }
]
export {studentRoutes, adminRoutes}