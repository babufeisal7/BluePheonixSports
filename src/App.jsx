import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

// Public Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const RugbyPage = React.lazy(() => import('./pages/RugbyPage'));
const FootballPage = React.lazy(() => import('./pages/FootballPage'));
const BasketballPage = React.lazy(() => import('./pages/BasketballPage'));
const SwimmingPage = React.lazy(() => import('./pages/SwimmingPage'));
const Gallerypage = React.lazy(() => import('./pages/Gallerypage'));
const Eventspage = React.lazy(() => import('./pages/Eventspage'));
const AboutusPage = React.lazy(() => import('./pages/AboutusPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const SportsProgramPage = React.lazy(() => import('./pages/SportsProgramPage'));
const RugbyProgramPage = React.lazy(() => import('./pages/RugbyProgramPage'));
const FootballProgramPage = React.lazy(() => import('./pages/FootballProgramPage'));
const BasketballProgramPage = React.lazy(() => import('./pages/BasketballProgramPage'));
const SwimmingProgramPage = React.lazy(() => import('./pages/SwimmingProgramPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Auth
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));

// Dashboards
const AdminDashboard = React.lazy(() => import('./pages/dashboard/admin/AdminDashboard'));
const CoachDashboard = React.lazy(() => import('./pages/dashboard/coach/CoachDashboard'));
const MedicDashboard = React.lazy(() => import('./pages/dashboard/medic/MedicDashboard'));
const PlayerDashboard = React.lazy(() => import('./pages/dashboard/player/PlayerDashboard'));

// Coach Routes
const PlayersList = React.lazy(() => import('./pages/dashboard/coach/PlayersList'));
const AssignTraining = React.lazy(() => import('./pages/dashboard/coach/AssignTraining'));
const MatchSchedule = React.lazy(() => import('./pages/dashboard/coach/MatchSchedule'));
const AttendanceTracker = React.lazy(() => import('./pages/dashboard/coach/AttendanceTracker'));
const FeedbackBoard = React.lazy(() => import('./pages/dashboard/coach/FeedbackBoard'));
const MedicalMonitor = React.lazy(() => import('./pages/dashboard/coach/MedicalMonitor'));
const Messages = React.lazy(() => import('./pages/dashboard/coach/Messages'));
const Resources = React.lazy(() => import('./pages/dashboard/coach/Resources'));
const PlayerHealth = React.lazy(() => import('./pages/dashboard/coach/PlayerHealth'));
const Performance = React.lazy(() => import('./pages/dashboard/coach/Performance'));
const CoachProfile = React.lazy(() => import('./pages/dashboard/coach/CoachProfile'));
const Achievements = React.lazy(() => import('./pages/dashboard/coach/Achievements'));
const Reports = React.lazy(() => import('./pages/dashboard/coach/Reports'));
const CoachSettings = React.lazy(() => import('./pages/dashboard/coach/CoachSettings')); // Fixed path

// Player Routes
const MyProfile = React.lazy(() => import('./pages/dashboard/player/MyProfile'));
const TrainingSchedule = React.lazy(() => import('./pages/dashboard/player/TrainingSchedule'));
const MatchAssignments = React.lazy(() => import('./pages/dashboard/player/MatchAssignments'));
const MyHealth = React.lazy(() => import('./pages/dashboard/player/MyHealth'));
const MyAchievements = React.lazy(() => import('./pages/dashboard/player/MyAchievements'));
const CoachFeedback = React.lazy(() => import('./pages/dashboard/player/CoachFeedback'));
const PlayerMessages = React.lazy(() => import('./pages/dashboard/player/Messages'));
const PlayerResources = React.lazy(() => import('./pages/dashboard/player/Resources'));
const TrainingTracker = React.lazy(() => import('./pages/dashboard/player/TrainingTracker'));
const MatchTracker = React.lazy(() => import('./pages/dashboard/player/MatchTracker'));
const PlayerSettings = React.lazy(() => import('./pages/dashboard/player/PlayerSettings'));

// Medic Routes
const InjuryLogs = React.lazy(() => import('./pages/dashboard/medic/InjuryLogs'));
const HealthReports = React.lazy(() => import('./pages/dashboard/medic/HealthReports'));
const RecoveryTracker = React.lazy(() => import('./pages/dashboard/medic/RecoveryTracker'));
const MedicalUpload = React.lazy(() => import('./pages/dashboard/medic/MedicalUpload'));
const MedicMessaging = React.lazy(() => import('./pages/dashboard/medic/Messaging'));
const MedicProfile = React.lazy(() => import('./pages/dashboard/medic/MedicProfile'));
const AddPatient = React.lazy(() => import('./pages/dashboard/medic/AddPatient'));
const QuickReport = React.lazy(() => import('./pages/dashboard/medic/QuickReport'));
const MedicSchedule = React.lazy(() => import('./pages/dashboard/medic/Schedule'));
const MedicSettings = React.lazy(() => import('./pages/dashboard/medic/MedicSettings'));

// Components
import Navbar from "./components/navbar";
import Hero from './components/hero';
import Aboutus from './components/aboutus';
import Sportsprograms from './components/sportsprograms';
import Services from './components/services';
import Events from './components/events';
import Ourteams from "./components/ourteams";
import Gallery from './components/gallery';
import AchievementsComp from "./components/achievements";
import Testimonials from "./components/Testimonials";
import Contactus from './components/contactus';
import Faq from './components/faq';
import Sponsers from './components/sponsers';
import Footer from './components/footer';
import Experts from './components/experts';
import ProtectedRoute from './components/ProtectedRoute';

// Home page layout
const Home = () => (
  <>
    <Hero />
    <Aboutus />
    <Sportsprograms />
    <Services />
    <Ourteams />
    <Events />
    <AchievementsComp />
    <Gallery />
    <Experts />
  </>
);

// Shared public layout
const Layout = ({ children }) => (
  <>
    {children}
    <Contactus />
    <Testimonials />
    <Faq />
    <Sponsers />
    <Footer />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbar = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/aboutus" element={<Layout><AboutusPage /></Layout>} />
          <Route path="/events" element={<Layout><Eventspage /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallerypage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/contactus" element={<Layout><Contactus /></Layout>} />
          
          {/* Teams Pages */}
          <Route path="/teams/rugby" element={<Layout><RugbyPage /></Layout>} />
          <Route path="/teams/football" element={<Layout><FootballPage /></Layout>} />
          <Route path="/teams/basketball" element={<Layout><BasketballPage /></Layout>} />
          <Route path="/teams/swimming" element={<Layout><SwimmingPage /></Layout>} />
          
          {/* Sports Programs Pages */}
          <Route path="/sports-programs" element={<Layout><SportsProgramPage /></Layout>} />
          <Route path="/rugby-program" element={<Layout><RugbyProgramPage /></Layout>} />
          <Route path="/football-program" element={<Layout><FootballProgramPage /></Layout>} />
          <Route path="/basketball-program" element={<Layout><BasketballProgramPage /></Layout>} />
          <Route path="/swimming-program" element={<Layout><SwimmingProgramPage /></Layout>} />

          {/* Services Page */}
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="admin" replace />} />
            <Route path="admin/*" element={<AdminDashboard />} />

            {/* Medic Routes */}
            <Route path="medic" element={<MedicDashboard />}>
              <Route index element={<Navigate to="injury-logs" replace />} />
              <Route path="injury-logs" element={<InjuryLogs />} />
              <Route path="health-reports" element={<HealthReports />} />
              <Route path="recovery-tracker" element={<RecoveryTracker />} />
              <Route path="medical-upload" element={<MedicalUpload />} />
              <Route path="messaging" element={<MedicMessaging />} />
              <Route path="profile" element={<MedicProfile />} />
              <Route path="add-patient" element={<AddPatient />} />
              <Route path="quick-report" element={<QuickReport />} />
              <Route path="schedule" element={<MedicSchedule />} />
              <Route path="settings" element={<MedicSettings />} />
              <Route path="*" element={<Navigate to="injury-logs" replace />} />
            </Route>

            {/* Player Routes */}
            <Route path="player" element={<PlayerDashboard />}>
              <Route index element={<MyProfile />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="training-schedule" element={<TrainingSchedule />} />
              <Route path="match-assignments" element={<MatchAssignments />} />
              <Route path="my-health" element={<MyHealth />} />
              <Route path="my-achievements" element={<MyAchievements />} />
              <Route path="coach-feedback" element={<CoachFeedback />} />
              <Route path="messages" element={<PlayerMessages />} />
              <Route path="resources" element={<PlayerResources />} />
              <Route path="training-tracker" element={<TrainingTracker />} />
              <Route path="match-tracker" element={<MatchTracker />} />
              <Route path="settings" element={<PlayerSettings />} />
            </Route>

            {/* Coach Routes */}
            <Route path="coach" element={<CoachDashboard />}>
              <Route index element={<Navigate to="players" replace />} />
              <Route path="players" element={<PlayersList />} />
              <Route path="training-plans" element={<AssignTraining />} />
              <Route path="match-schedule" element={<MatchSchedule />} />
              <Route path="attendance" element={<AttendanceTracker />} />
              <Route path="feedback" element={<FeedbackBoard />} />
              <Route path="medical-monitor" element={<MedicalMonitor />} />
              <Route path="messages" element={<Messages />} />
              <Route path="resources" element={<Resources />} />
              <Route path="player-health" element={<PlayerHealth />} />
              <Route path="performance" element={<Performance />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<CoachProfile />} />
              <Route path="settings" element={<CoachSettings />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;