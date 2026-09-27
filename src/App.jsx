import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LanguageProvider } from "./i18n/LanguageContext"
import { ThemeProvider } from "./theme/ThemeContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Program from "./pages/Program"
import Team from "./pages/Team"
import Gallery from "./pages/Gallery"
import Certificate from "./pages/Certificate"
import Contact from "./pages/Contact"

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="program" element={<Program />} />
            <Route path="team" element={<Team />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}
