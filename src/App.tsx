import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { themes } from './data'
import ThemeView from './components/ThemeView'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null)
  const [showContextMenu, setShowContextMenu] = useState(false)

  useEffect(() => {
    // Smart anti-debug protection system
    const createAntiDebugSystem = () => {
      let violationCount = 0;
      let lastDetectionTime = Date.now();
      const MAX_VIOLATIONS = 3;
      const TIME_THRESHOLD = 100; // Increase detection sensitivity
      const CHECK_INTERVAL = 300; // Increase detection frequency
      const DEBUG_MODE = window.location.search.includes('debug=true'); // Debug mode
      
      // Detection status
      let isWarningShown = false;
      let isFunctionalityLimited = false;
      
      // Show enhanced user warning
      const showWarning = () => {
        if (isWarningShown) return;
        isWarningShown = true;
        
        // Page title flashing reminder
        const originalTitle = document.title;
        let flashCount = 0;
        const titleFlash = setInterval(() => {
          document.title = flashCount % 2 === 0 ? '🚨 Debug Detection Alert' : originalTitle;
          flashCount++;
          if (flashCount >= 6) {
            clearInterval(titleFlash);
            document.title = originalTitle;
          }
        }, 500);
        
        const warningDiv = document.createElement('div');
        warningDiv.innerHTML = `
          <div style="
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            background: linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(239, 68, 68, 0.95));
            color: white; padding: 20px 25px; border-radius: 12px; 
            font-family: Arial, sans-serif; font-size: 15px;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.4); 
            max-width: 380px; border: 2px solid rgba(255, 255, 255, 0.2);
            animation: warningPulse 2s ease-in-out infinite;
          ">
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 16px;">
              🚨 Security Detection Warning
            </div>
            <div style="line-height: 1.4; margin-bottom: 12px;">
              Debugging behavior detected! To protect content and creator rights, please close developer tools immediately.
            </div>
            <div style="margin-top: 12px; font-size: 13px; opacity: 0.9; 
                        padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
              Environment: ${isDevelopment ? 'Development' : 'Production'} | 
              Detection Time: ${new Date().toLocaleTimeString()}
            </div>
          </div>
          <style>
            @keyframes warningPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
          </style>
        `;
        document.body.appendChild(warningDiv);
        
        // Add audio alert (if possible)
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
          // Ignore audio playback failures
        }
        
        // Auto-remove warning after 7 seconds
        setTimeout(() => {
          if (warningDiv.parentNode) {
            warningDiv.parentNode.removeChild(warningDiv);
            isWarningShown = false;
          }
        }, 7000);
      };
      
      // Limit functionality (progressive protection)
      const limitFunctionality = () => {
        if (isFunctionalityLimited) return;
        isFunctionalityLimited = true;
        
        // Add blur effect instead of complete blocking
        const overlay = document.createElement('div');
        overlay.innerHTML = `
          <div style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(5px);
            display: flex; align-items: center; justify-content: center;
            font-family: Arial, sans-serif; color: white; text-align: center;
          ">
            <div style="
              background: rgba(0,0,0,0.8); padding: 40px; border-radius: 12px;
              border: 1px solid rgba(255,255,255,0.1); max-width: 400px;
            ">
              <div style="font-size: 24px; margin-bottom: 20px;">🔒</div>
              <h3 style="margin: 0 0 15px 0; font-size: 18px;">Content Protection</h3>
              <p style="margin: 0 0 20px 0; line-height: 1.5; opacity: 0.9;">
                To protect creator rights, access is restricted when debugging tools are detected. Please close developer tools and refresh the page.
              </p>
              <button onclick="window.location.reload()" style="
                background: #007bff; color: white; border: none; padding: 10px 20px;
                border-radius: 6px; cursor: pointer; font-size: 14px;
              ">
                Refresh Page
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);
      };
      
      // Final protection measures
      const finalProtection = () => {
        // Clear page content and redirect
        document.body.innerHTML = `
          <div style="
            display: flex; align-items: center; justify-content: center;
            min-height: 100vh; background: #000; color: #fff;
            font-family: Arial, sans-serif; text-align: center;
          ">
            <div>
              <h2>🛡️ Security Protection</h2>
              <p>Persistent debugging behavior detected, page has been protected.</p>
              <p>For inquiries, please contact: xuemian888@gmail.com</p>
            </div>
          </div>
        `;
        
        // Delayed reload to give user time to read
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      };
      
      // Environment detection - layered processing
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.protocol === 'file:';
      const isProduction = !isDevelopment && !DEBUG_MODE;
      
      // Dynamic baseline calibration system
      const baselineWindowState = {
        heightDiff: window.outerHeight - window.innerHeight,
        widthDiff: window.outerWidth - window.innerWidth,
        timestamp: Date.now(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        userAgent: navigator.userAgent
      };
      
      // Browser detection and configuration
      const browserInfo = {
        isEdge: /Edg/.test(navigator.userAgent),
        isChrome: /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent),
        isFirefox: /Firefox/.test(navigator.userAgent),
        isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
        version: navigator.userAgent
      };
      
      // Cooldown mechanism - adjust based on environment
      let lastViolationTime = 0;
      const COOLDOWN_PERIOD = isDevelopment ? 500 : 1000; // Shorter cooldown in development
      
      // Popup DevTools detection
      let popupWindows = new Set();
      const originalWindowOpen = window.open;
      
      // Override window.open to detect popup DevTools
      window.open = function(url?: string | URL, target?: string, features?: string) {
        const popup = originalWindowOpen.call(this, url, target, features);
        if (popup) {
          popupWindows.add(popup);
          
          // Check if it's a DevTools popup
          setTimeout(() => {
            try {
              if (popup && !popup.closed) {
                const popupWidth = popup.outerWidth || 0;
                const popupHeight = popup.outerHeight || 0;
                const title = popup.document?.title || '';
                
                // DevTools popup characteristics
                const isLikelyDevTools = 
                  (popupWidth > 800 && popupHeight > 600) || // Large popup
                  title.toLowerCase().includes('devtools') ||
                  title.toLowerCase().includes('developer') ||
                  title.toLowerCase().includes('console') ||
                  (popupWidth / popupHeight > 1.5); // Wide aspect ratio typical of DevTools
                
                if (isLikelyDevTools) {
                  handleViolation('Popup DevTools');
                }
              }
            } catch (e) {
              // Cross-origin restrictions might prevent access
              // Assume suspicious if we can't access
              if (popup && !popup.closed) {
                handleViolation('Suspicious Popup');
              }
            }
          }, 100);
        }
        return popup;
      };
      
      // Clean up closed popups
      const cleanupPopups = () => {
        for (const popup of popupWindows) {
          if ((popup as Window).closed) {
            popupWindows.delete(popup);
          }
        }
      };
      
      // Console method detection
      const originalConsole = { ...console };
      let consoleModified = false;
      
      const detectConsoleModification = () => {
        // Check if common console methods have been modified
        const methods = ['log', 'warn', 'error', 'debug', 'info'];
        for (const method of methods) {
          if (console[method as keyof Console] !== originalConsole[method as keyof Console]) {
            if (!consoleModified) {
              consoleModified = true;
              handleViolation('Console Modification');
            }
            return;
          }
        }
        consoleModified = false;
      };
      
      // Debugger execution time detection
      const detectDebugging = () => {
        const startTime = Date.now();
        
        // Execute debugger statement
        try {
          (function debug() {})['constructor']('debugger')();
        } catch (e) {
          // Ignore debugger exceptions
        }
        
        const executionTime = Date.now() - startTime;
        
        // Output detection log in debug mode
        if (DEBUG_MODE) {
          console.log(`[Anti-Debug] debugger execution time: ${executionTime}ms, threshold: ${TIME_THRESHOLD}ms`);
        }
        
        // If execution time is too long, it may indicate debugging
        if (executionTime > TIME_THRESHOLD) {
          handleViolation('Debug Detection');
        }
      };
      
      // Smart DevTools detection with baseline comparison
      const detectDevTools = () => {
        cleanupPopups(); // Clean up closed popup windows
        
        const currentHeightDiff = window.outerHeight - window.innerHeight;
        const currentWidthDiff = window.outerWidth - window.innerWidth;
        
        // Calculate changes relative to baseline
        const heightChange = Math.abs(currentHeightDiff - baselineWindowState.heightDiff);
        const widthChange = Math.abs(currentWidthDiff - baselineWindowState.widthDiff);
        
        // Smart threshold calculation based on browser and screen size
        const baseThreshold = Math.min(200, window.screen.height * 0.15);
        let heightThreshold = baseThreshold;
        let widthThreshold = baseThreshold;
        
        // Browser-specific adjustments
        if (browserInfo.isEdge) {
          // Edge with side tabs: be more lenient with width changes
          widthThreshold = Math.max(350, baseThreshold * 2);
          heightThreshold = baseThreshold * 1.2;
        } else if (browserInfo.isChrome || browserInfo.isSafari) {
          // Standard browsers
          widthThreshold = baseThreshold;
          heightThreshold = baseThreshold;
        } else if (browserInfo.isFirefox) {
          // Firefox has different DevTools behavior
          widthThreshold = baseThreshold * 1.1;
          heightThreshold = baseThreshold * 0.9;
        }
        
        // Development environment: more lenient
        if (isDevelopment) {
          heightThreshold *= 1.5;
          widthThreshold *= 1.5;
        }
        
        // Multi-dimensional detection criteria
        const detectionCriteria = {
          significantHeightChange: heightChange > heightThreshold,
          significantWidthChange: widthChange > widthThreshold,
          suspiciousRatio: (currentHeightDiff > 250 && currentWidthDiff > 250),
          extremeChange: (heightChange > heightThreshold * 2) || (widthChange > widthThreshold * 2)
        };
        
        // Output detailed detection info in debug mode
        if (DEBUG_MODE) {
          console.group('[Anti-Debug] DevTools Detection Analysis');
          console.log('Baseline:', baselineWindowState);
          console.log('Current:', { heightDiff: currentHeightDiff, widthDiff: currentWidthDiff });
          console.log('Changes:', { heightChange, widthChange });
          console.log('Thresholds:', { heightThreshold, widthThreshold });
          console.log('Browser:', browserInfo);
          console.log('Criteria:', detectionCriteria);
          console.groupEnd();
        }
        
        // Multi-dimensional trigger logic
        let suspiciousScore = 0;
        if (detectionCriteria.significantHeightChange) suspiciousScore++;
        if (detectionCriteria.significantWidthChange) suspiciousScore++;
        if (detectionCriteria.suspiciousRatio) suspiciousScore++;
        if (detectionCriteria.extremeChange) suspiciousScore += 2;
        
        // Require multiple criteria for Edge to reduce false positives
        const requiredScore = browserInfo.isEdge ? 3 : 2;
        
        if (suspiciousScore >= requiredScore) {
          handleViolation('DevTools Detection');
        }
      };
      
      // Enhanced violation handling logic
      const handleViolation = (type: string) => {
        const currentTime = Date.now();
        
        // Detailed logging
        const logEntry = {
          time: new Date().toISOString(),
          type,
          environment: isDevelopment ? 'development' : 'production',
          violationCount: violationCount + 1,
          userAgent: navigator.userAgent.substring(0, 100)
        };
        
        // Output detailed info in debug mode
        if (DEBUG_MODE) {
          console.group(`[Anti-Debug Detection] ${type}`);
          console.log('Detection Time:', logEntry.time);
          console.log('Violation Type:', type);
          console.log('Current Environment:', logEntry.environment);
          console.log('Violation Count:', logEntry.violationCount);
          console.log('User Agent:', logEntry.userAgent);
          console.groupEnd();
        }
        
        // Cooldown check (but output log in debug mode)
        if (currentTime - lastViolationTime < COOLDOWN_PERIOD) {
          if (DEBUG_MODE) {
            console.log(`[Anti-Debug] Cooldown period, ignoring detection (remaining: ${COOLDOWN_PERIOD - (currentTime - lastViolationTime)}ms)`);
          }
          return;
        }
        
        violationCount++;
        lastViolationTime = currentTime;
        
        // Response strategy based on environment and violation count
        if (isDevelopment) {
          // Development environment: more lenient handling
          console.warn(`[Anti-Debug] Development mode detection: ${type}, violation count: ${violationCount}`);
          if (violationCount === 1) {
            showWarning();
          } else if (violationCount >= 3) {
            limitFunctionality();
          }
          // No final protection in development environment
        } else {
          // Production environment: full protection
          console.warn(`[Anti-Debug] Production mode detection: ${type}, violation count: ${violationCount}`);
          if (violationCount === 1) {
            showWarning();
          } else if (violationCount === 2) {
            limitFunctionality();
          } else if (violationCount >= MAX_VIOLATIONS) {
            finalProtection();
          }
        }
        
        // Manual trigger detection (debug feature)
        if (DEBUG_MODE && window.location.search.includes('trigger=true')) {
          console.log('[Anti-Debug] Manual trigger mode activated');
          showWarning();
        }
      };
      
      // Enhanced periodic detection with performance monitoring
      let detectionCycles = 0;
      const detectionInterval = setInterval(() => {
        try {
          const detectionStart = performance.now();
          detectionCycles++;
          
          // Execute all detections
          detectDebugging();
          detectDevTools();
          detectConsoleModification();
          
          const detectionTime = performance.now() - detectionStart;
          
          // Performance monitoring - detect if detection is being slowed down
          if (detectionTime > 50) { // Detection taking too long
            if (DEBUG_MODE) {
              console.warn(`[Anti-Debug] Slow detection cycle: ${detectionTime.toFixed(2)}ms`);
            }
            handleViolation('Performance Anomaly');
          }
          
          // Show detection status in debug mode (less frequent to reduce noise)
          if (DEBUG_MODE && violationCount === 0 && detectionCycles % 10 === 0) {
            console.log(`[Anti-Debug] Detection cycles: ${detectionCycles}, avg interval: ${CHECK_INTERVAL}ms`);
          }
          
        } catch (e) {
          if (DEBUG_MODE) {
            console.error('[Anti-Debug] Exception occurred during detection:', e);
          }
          handleViolation('Exception Caught');
        }
      }, CHECK_INTERVAL);
      
      // Debug mode startup banner with enhanced info
      if (DEBUG_MODE) {
        console.log(`
╔════════════════════════════════════════════════╗
║         Enhanced Anti-Debug System v2.0        ║
╠════════════════════════════════════════════════╣
║ Environment: ${isDevelopment ? 'Development' : 'Production'}                      ║
║ Browser: ${browserInfo.isEdge ? 'Edge' : browserInfo.isChrome ? 'Chrome' : browserInfo.isFirefox ? 'Firefox' : 'Other'}                           ║
║ Check Interval: ${CHECK_INTERVAL}ms                        ║
║ Time Threshold: ${TIME_THRESHOLD}ms                         ║
║ Cooldown Period: ${COOLDOWN_PERIOD}ms                       ║
║ Baseline: H=${baselineWindowState.heightDiff}, W=${baselineWindowState.widthDiff}           ║
║ Screen: ${baselineWindowState.screenWidth}x${baselineWindowState.screenHeight}                        ║
║ Features: Popup detection, Smart thresholds   ║
║ Manual Trigger: ?trigger=true                 ║
╚════════════════════════════════════════════════╝
        `);
      }
      
      // Return comprehensive cleanup function
      return () => {
        // Restore original window.open
        window.open = originalWindowOpen;
        
        // Clear detection interval
        if (detectionInterval) {
          clearInterval(detectionInterval);
        }
        
        // Close and clean up popup windows
        for (const popup of popupWindows) {
          try {
            if (!(popup as Window).closed) {
              (popup as Window).close();
            }
          } catch (e) {
            // Ignore errors when closing popups
          }
        }
        popupWindows.clear();
      };
    };

    const cleanupAntiDebug = createAntiDebugSystem();

    // Original event listener code
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setContextMenuPosition({ x: e.clientX, y: e.clientY })
      setShowContextMenu(true)
      setTimeout(() => setShowContextMenu(false), 2000)
    }

    // Disable F12 developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault()
      }
    }

    // Disable drag
    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    // Add all event listeners
    document.addEventListener('dragstart', preventDrag)
    document.addEventListener('drop', preventDrag)
    document.addEventListener('dragover', preventDrag)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup all event listeners and anti-debug system
    return () => {
      document.removeEventListener('dragstart', preventDrag)
      document.removeEventListener('drop', preventDrag)
      document.removeEventListener('dragover', preventDrag)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      
      // Cleanup anti-debug system
      if (cleanupAntiDebug) {
        cleanupAntiDebug()
      }
    }
  }, [])

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length)
  }

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + themes.length) % themes.length)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-16">
        <ThemeView theme={themes[currentTheme]} />
        
        {/* Theme Navigation */}
        <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-black/70 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full">
          <button 
            onClick={prevTheme}
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous theme"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          
          {themes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTheme(index)}
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all ${
                index === currentTheme ? 'bg-white w-4 md:w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to theme ${index + 1}`}
            />
          ))}
          
          <button 
            onClick={nextTheme}
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next theme"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>

        <Footer />
      </main>

      {contextMenuPosition && showContextMenu && (
        <div
          style={{
            position: 'absolute',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            pointerEvents: 'none',
            transition: 'opacity 1s ease-in-out',
            opacity: showContextMenu ? 1 : 0,
          }}
        >
          ©️
        </div>
      )}
    </div>
  )
}

export default App