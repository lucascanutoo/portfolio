export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string[];
  upcoming?: boolean;
  accentColor: string;
}

export const experiences: Experience[] = [
  {
    role: "IT Support Technician",
    company: "Elovias",
    duration: "Current Experience",
    description: [
      "Provided technical support to end users, troubleshooting hardware, software, access, and infrastructure issues",
      "Monitored IT environments with Zabbix, tracking alerts, service availability, incidents, and operational status",
      "Managed Microsoft 365 Admin tasks, including user accounts, licenses, permissions, and corporate settings",
      "Handled Active Directory administration for users, groups, policies, access control, and account lifecycle tasks",
      "Supported networks, workstations, printers, internal systems, IT inventory, and preventive maintenance routines",
    ],
    accentColor: "#FBBF24",
  },
];
