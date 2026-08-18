import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "@/components/layout/AppShell";

import Dashboard from "@/pages/Dashboard";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import SkillGap from "@/pages/SkillGap";
import Profile from "@/pages/Profile";
import GraphExplorer from "@/pages/GraphExplorer";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:jobName" element={<JobDetails />} />

        <Route path="/skill-gap" element={<SkillGap />} />

        <Route path="/graph" element={<GraphExplorer />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
