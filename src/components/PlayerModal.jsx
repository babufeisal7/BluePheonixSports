import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const PlayerModal = ({ 
  isOpen, 
  player, 
  onClose,
  theme = 'sport',
  enableStatsTabs = true,
  enableAchievements = true,
  enableSocialConnect = true
}) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen || !player) return null;

  const {
    imgSrc,
    altText,
    name,
    position,
    team,
    bio,
    stats,
    achievements,
    socialLinks,
    highlights
  } = player;

  // Theme configurations
  const themes = {
    sport: {
      bg: 'bg-gradient-to-br from-blue-900 to-indigo-800',
      text: 'text-white',
      accent: 'bg-yellow-400 text-gray-900',
      secondary: 'bg-indigo-700'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-white',
      accent: 'bg-gray-700',
      secondary: 'bg-gray-800'
    },
    light: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accent: 'bg-gray-100',
      secondary: 'bg-gray-50'
    }
  };

  const currentTheme = themes[theme] || themes.sport;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className={`relative rounded-2xl overflow-hidden shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col ${currentTheme.bg} ${currentTheme.text}`}
      >
        {/* Header with close button */}
        <div className={`flex justify-between items-center p-4 ${currentTheme.secondary}`}>
          <div>
            <span className="text-sm opacity-80">{team}</span>
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${currentTheme.accent} hover:opacity-90 transition-opacity`}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Player image section */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src={imgSrc}
                alt={altText}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-sm opacity-90">{position}</p>
              </div>
            </div>

            {/* Social links */}
            {enableSocialConnect && socialLinks && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">CONNECT</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${currentTheme.accent} hover:opacity-90 transition-opacity`}
                      aria-label={link.name}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={link.iconPath} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Player info section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold mb-2">ABOUT</h3>
              <p className="opacity-90 leading-relaxed">{bio}</p>
            </div>

            {/* Tabs navigation */}
            {enableStatsTabs && (
              <div className="border-b border-gray-700">
                <nav className="flex space-x-6">
                  {['overview', 'stats', 'achievements', 'highlights'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-yellow-400' : 'opacity-70 hover:opacity-100'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Tab content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(stats.overview).map(([key, value]) => (
                    <div key={key} className={`p-4 rounded-lg ${currentTheme.secondary}`}>
                      <p className="text-sm opacity-80">{key}</p>
                      <p className="text-xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${currentTheme.secondary}`}>
                        <th className="text-left py-3 px-4">Stat</th>
                        <th className="text-right py-3 px-4">Value</th>
                        <th className="text-right py-3 px-4">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(stats.detailed).map(([key, {value, rank}]) => (
                        <tr key={key} className="border-b border-gray-700">
                          <td className="py-3 px-4">{key}</td>
                          <td className="text-right py-3 px-4 font-medium">{value}</td>
                          <td className="text-right py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${rank <= 10 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20'}`}>
                              #{rank}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'achievements' && enableAchievements && (
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.year} className={`p-4 rounded-lg ${currentTheme.secondary}`}>
                      <div className="flex justify-between">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <span className="text-sm opacity-80">{achievement.year}</span>
                      </div>
                      <p className="mt-1 text-sm opacity-90">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'highlights' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <img
                        src={highlight.thumbnail}
                        alt={`Highlight ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-sm truncate">{highlight.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      overview: PropTypes.object.isRequired,
      detailed: PropTypes.object.isRequired
    }).isRequired,
    achievements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ),
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        iconPath: PropTypes.string.isRequired
      })
    ),
    highlights: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        videoUrl: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['sport', 'dark', 'light']),
  enableStatsTabs: PropTypes.bool,
  enableAchievements: PropTypes.bool,
  enableSocialConnect: PropTypes.bool
};

PlayerModal.defaultProps = {
  theme: 'sport',
  enableStatsTabs: true,
  enableAchievements: true,
  enableSocialConnect: true
};

export default PlayerModal;