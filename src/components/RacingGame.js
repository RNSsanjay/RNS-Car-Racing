import React, { useState, useEffect, useCallback } from 'react';

// Car component with updated design
const Car = ({ color, position, laneNumber, isPlayer, carType }) => {
  const laneOffsets = [25, 50, 75];
  const leftPosition = `${laneOffsets[laneNumber]}%`;

  // Different car designs based on type
  const renderCarBody = () => {
    switch(carType) {
      case 'racer':
        return (
          <>
            {/* Racing car design */}
            <div className={`${color} w-12 h-20 relative rounded-lg shadow-xl`}>
              {/* Front spoiler */}
              <div className="absolute -bottom-1 left-0 w-12 h-2 bg-white rounded-b-lg" />

              {/* Hood */}
              <div className={`absolute top-2 left-1 w-10 h-8 ${color} rounded-t-lg`} style={{ filter: 'brightness(1.1)' }} />

              {/* Cockpit */}
              <div className="absolute top-7 left-2 w-8 h-5 bg-white rounded-t-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />

              {/* Side intakes */}
              <div className="absolute top-14 left-0 w-2 h-4 bg-white rounded-l-sm" />
              <div className="absolute top-14 right-0 w-2 h-4 bg-white rounded-r-sm" />

              {/* Wheels */}
              <div className="absolute -left-1 top-4 w-3 h-5 bg-white rounded-l-full" />
              <div className="absolute -right-1 top-4 w-3 h-5 bg-white rounded-r-full" />
              <div className="absolute -left-1 bottom-4 w-3 h-5 bg-white rounded-l-full" />
              <div className="absolute -right-1 bottom-4 w-3 h-5 bg-white rounded-r-full" />

              {/* Headlights */}
              <div className="absolute top-1 left-1 w-3 h-1 bg-white rounded-full shadow-white" />
              <div className="absolute top-1 right-1 w-3 h-1 bg-white rounded-full shadow-white" />

              {/* Taillights */}
              <div className="absolute bottom-2 left-1 w-2 h-1 bg-red-500 rounded-full shadow-red-400" />
              <div className="absolute bottom-2 right-1 w-2 h-1 bg-red-500 rounded-full shadow-red-400" />
            </div>
          </>
        );
      case 'cyber':
        return (
          <>
            {/* Cyberpunk-inspired car */}
            <div className={`${color} w-12 h-18 relative`} style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)' }}>
              {/* Windshield */}
              <div className="absolute top-3 left-2 w-8 h-6 bg-white opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />

              {/* Tech lines */}
              <div className="absolute top-0 left-6 w-1 h-full bg-white" />
              <div className="absolute top-10 left-2 w-8 h-1 bg-white" />

              {/* Wheels */}
              <div className="absolute -left-1 top-6 w-3 h-4 bg-white rounded-l-sm" />
              <div className="absolute -right-1 top-6 w-3 h-4 bg-white rounded-r-sm" />
              <div className="absolute -left-1 bottom-2 w-3 h-4 bg-white rounded-l-sm" />
              <div className="absolute -right-1 bottom-2 w-3 h-4 bg-white rounded-r-sm" />

              {/* Glow effect */}
              <div className="absolute -bottom-1 left-0 w-12 h-1 bg-white animate-pulse" />
            </div>
          </>
        );
      default: // 'truck'
        return (
          <>
            {/* Tech truck design */}
            <div className={`${color} w-14 h-22 relative rounded-sm shadow-lg`}>
              {/* Cabin */}
              <div className={`absolute top-0 left-2 w-10 h-8 ${color} rounded-t-lg`} style={{ filter: 'brightness(1.2)' }} />

              {/* Windshield */}
              <div className="absolute top-2 left-3 w-8 h-4 bg-white rounded-t-sm" />

              {/* Truck bed */}
              <div className={`absolute top-8 left-1 w-12 h-12 ${color} rounded-b-sm`} style={{ filter: 'brightness(0.9)' }} />

              {/* Wheels - larger for truck */}
              <div className="absolute -left-1 top-5 w-4 h-6 bg-white rounded-l-full" />
              <div className="absolute -right-1 top-5 w-4 h-6 bg-white rounded-r-full" />
              <div className="absolute -left-1 bottom-2 w-4 h-6 bg-white rounded-l-full" />
              <div className="absolute -right-1 bottom-2 w-4 h-6 bg-white rounded-r-full" />

              {/* Front grille */}
              <div className="absolute top-6 left-3 w-8 h-2 bg-white rounded" />

              {/* Headlights */}
              <div className="absolute top-5 left-2 w-2 h-2 bg-white rounded-full" />
              <div className="absolute top-5 right-2 w-2 h-2 bg-white rounded-full" />
            </div>
          </>
        );
    }
  };

  return (
    <div
      className="absolute w-16 h-24 transition-all duration-100"
      style={{
        bottom: `${position}%`,
        left: leftPosition,
        transform: 'translate(-50%, 0)',
        zIndex: 10
      }}
    >
      {renderCarBody()}

      {/* Player indicator */}
      {isPlayer && (
        <div className="absolute -top-6 left-0 w-full flex justify-center">
          <div className="px-2 py-1 bg-white text-xs font-bold text-red-900 rounded-lg animate-pulse shadow-lg">
            YOU
          </div>
        </div>
      )}
    </div>
  );
};

// Explosion component for collisions
const Explosion = ({ position, laneNumber }) => {
  const laneOffsets = [25, 50, 75];
  const leftPosition = `${laneOffsets[laneNumber]}%`;

  return (
    <div
      className="absolute w-20 h-20 transition-all duration-100"
      style={{
        bottom: `${position}%`,
        left: leftPosition,
        transform: 'translate(-50%, 0)',
        zIndex: 20
      }}
    >
      <div className="relative w-full h-full animate-ping">
        <div className="absolute inset-0 bg-red-500 rounded-full opacity-70 scale-50 animate-ping" />
        <div className="absolute inset-0 bg-red-400 rounded-full opacity-50 scale-75 animate-ping" />
        <div className="absolute inset-0 bg-red-300 rounded-full opacity-30 animate-ping" />
      </div>
    </div>
  );
};

// Road marking component
const RoadMarking = ({ position }) => {
  return (
    <div
      className="absolute w-full h-6 flex justify-around"
      style={{ bottom: `${position}%` }}
    >
      <div className="w-16 h-2 bg-white rounded-full opacity-50" />
      <div className="w-16 h-2 bg-white rounded-full opacity-50" />
    </div>
  );
};

// Power-up component
const PowerUp = ({ type, position, laneNumber, onCollect }) => {
  const laneOffsets = [25, 50, 75];
  const leftPosition = `${laneOffsets[laneNumber]}%`;

  return (
    <div
      className="absolute w-10 h-10 transition-all duration-100"
      style={{
        bottom: `${position}%`,
        left: leftPosition,
        transform: 'translate(-50%, 0)',
        zIndex: 5
      }}
      onClick={onCollect}
    >
      {type === 'speed' && (
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <div className="text-sm font-bold text-white">⚡</div>
        </div>
      )}
      {type === 'shield' && (
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
          <div className="text-sm font-bold text-red-500">🛡️</div>
        </div>
      )}
    </div>
  );
};

// Main game component
const TechRacingGame = () => {
  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  // Car states
  const [playerPosition, setPlayerPosition] = useState(0);
  const [playerSpeed, setPlayerSpeed] = useState(5);
  const [playerLane, setPlayerLane] = useState(1); // 0:left, 1:middle, 2:right
  const [playerShielded, setPlayerShielded] = useState(false);

  const [computerCars, setComputerCars] = useState([
    { id: 1, position: 20, speed: 3, lane: 0, type: 'cyber' },
    { id: 2, position: 40, speed: 4, lane: 2, type: 'truck' }
  ]);

  // Road and effects
  const [roadMarkings, setRoadMarkings] = useState([0, 20, 40, 60, 80]);
  const [powerUps, setPowerUps] = useState([]);
  const [explosion, setExplosion] = useState(null);
  const [nightMode, setNightMode] = useState(false);

  const trackLength = 90;

  // Check for collisions
  const checkCollisions = useCallback(() => {
    for (const car of computerCars) {
      // Check if cars are in the same lane
      if (car.lane === playerLane) {
        // Check if cars are close to each other (collision)
        const distanceBetween = Math.abs(car.position - playerPosition);
        if (distanceBetween < 8) {
          if (playerShielded) {
            // Shield protects player
            setPlayerShielded(false);
            return false;
          } else {
            // Game over on collision
            setExplosion({ position: playerPosition, lane: playerLane });
            setGameOver(true);
            setGameActive(false);
            return true;
          }
        }
      }
    }
    return false;
  }, [computerCars, playerLane, playerPosition, playerShielded]);

  // Check for power-up collection
  const checkPowerUpCollection = useCallback(() => {
    const collectedPowerUps = [];

    powerUps.forEach((powerUp, index) => {
      if (powerUp.lane === playerLane) {
        const distanceBetween = Math.abs(powerUp.position - playerPosition);
        if (distanceBetween < 5) {
          collectedPowerUps.push(index);

          // Apply power-up effect
          if (powerUp.type === 'speed') {
            setPlayerSpeed(prev => Math.min(prev + 2, 10));
            setScore(prev => prev + 50);
          } else if (powerUp.type === 'shield') {
            setPlayerShielded(true);
            setScore(prev => prev + 100);
          }
        }
      }
    });

    // Remove collected power-ups
    if (collectedPowerUps.length > 0) {
      setPowerUps(prev => prev.filter((_, index) => !collectedPowerUps.includes(index)));
    }
  }, [powerUps, playerLane, playerPosition]);

  // Spawn power-ups randomly
  useEffect(() => {
    if (!gameActive) return;

    const powerUpInterval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% chance every 3 seconds
        const newPowerUp = {
          id: Date.now(),
          type: Math.random() < 0.7 ? 'speed' : 'shield',
          position: 0, // Start at bottom
          lane: Math.floor(Math.random() * 3)
        };
        setPowerUps(prev => [...prev, newPowerUp]);
      }
    }, 3000);

    return () => clearInterval(powerUpInterval);
  }, [gameActive]);

  // Random speed changes for computer cars
  useEffect(() => {
    if (!gameActive) return;

    const speedChangeInterval = setInterval(() => {
      setComputerCars(prevCars =>
        prevCars.map(car => ({
          ...car,
          speed: 2 + Math.random() * (3 + level)
        }))
      );
    }, 2000);

    return () => clearInterval(speedChangeInterval);
  }, [gameActive, level]);

  // Randomly change computer car lanes
  useEffect(() => {
    if (!gameActive) return;

    const laneChangeInterval = setInterval(() => {
      setComputerCars(prevCars =>
        prevCars.map(car => {
          if (Math.random() < 0.3) { // 30% chance to change lane
            const currentLane = car.lane;
            let newLane;

            if (currentLane === 0) newLane = 1;
            else if (currentLane === 2) newLane = 1;
            else newLane = Math.random() < 0.5 ? 0 : 2;

            return { ...car, lane: newLane };
          }
          return car;
        })
      );
    }, 3000);

    return () => clearInterval(laneChangeInterval);
  }, [gameActive]);

  // Animate road markings
  useEffect(() => {
    if (!gameActive) return;

    const roadAnimationInterval = setInterval(() => {
      setRoadMarkings(prevMarkings => {
        return prevMarkings.map(mark => {
          const newPos = mark - 1;
          return newPos < 0 ? 100 : newPos;
        });
      });
    }, 100);

    return () => clearInterval(roadAnimationInterval);
  }, [gameActive]);

  // Start the game
  const startGame = () => {
    setPlayerPosition(0);
    setPlayerSpeed(5);
    setPlayerLane(1);
    setPlayerShielded(false);

    setComputerCars([
      { id: 1, position: 20, speed: 3, lane: 0, type: 'cyber' },
      { id: 2, position: 40, speed: 4, lane: 2, type: 'truck' }
    ]);

    setPowerUps([]);
    setExplosion(null);
    setWinner('');
    setGameOver(false);
    setTimeLeft(120);
    setScore(0);
    setGameActive(true);
  };

  // Start next level
  const startNextLevel = () => {
    setPlayerPosition(0);
    setPlayerShielded(false);

    // Add more cars for higher levels
    const newCars = [...computerCars];
    if (level < 3) {
      newCars.push({
        id: 3 + level,
        position: 60,
        speed: 3 + Math.random() * level,
        lane: Math.floor(Math.random() * 3),
        type: Math.random() < 0.5 ? 'cyber' : 'truck'
      });
    }

    setComputerCars(newCars);
    setPowerUps([]);
    setExplosion(null);
    setWinner('');
    setGameOver(false);
    setTimeLeft(120);
    setLevel(prev => prev + 1);
    setGameActive(true);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;

      if (e.key === 'ArrowUp') {
        setPlayerSpeed(prev => Math.min(prev + 1, 10));
      } else if (e.key === 'ArrowDown') {
        setPlayerSpeed(prev => Math.max(prev - 1, 2));
      } else if (e.key === 'ArrowLeft') {
        setPlayerLane(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'ArrowRight') {
        setPlayerLane(prev => Math.min(prev + 1, 2));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameActive]);

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameActive(false);

          // Check who's ahead when time runs out
          const playerProgress = playerPosition;
          const computerProgress = Math.max(...computerCars.map(car => car.position));

          if (playerProgress > computerProgress) {
            setWinner('Player');
            setScore(prev => prev + 500);
            if (score + 500 > highScore) setHighScore(score + 500);
            return 0;
          } else {
            setGameOver(true);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, playerPosition, computerCars, score, highScore]);

  // Game loop for car movement and collision detection
  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      // Update player position
      setPlayerPosition(prev => {
        const newPos = prev + playerSpeed * 0.1;
        return newPos >= trackLength ? trackLength : newPos;
      });

      // Update computer car positions
      setComputerCars(prevCars =>
        prevCars.map(car => {
          const newPos = car.position + car.speed * 0.1;
          return {
            ...car,
            position: newPos >= trackLength ? trackLength : newPos
          };
        })
      );

      // Update power-up positions
      setPowerUps(prevPowerUps =>
        prevPowerUps.map(powerUp => {
          const newPos = powerUp.position + 0.5; // Power-ups move slower than cars
          // Remove if past top of screen
          if (newPos > 100) return null;
          return {
            ...powerUp,
            position: newPos
          };
        }).filter(Boolean)
      );

      // Check for collisions
      checkCollisions();

      // Check for power-up collection
      checkPowerUpCollection();

      // Update score based on distance
      setScore(prev => prev + 1);

    }, 100);

    return () => clearInterval(gameLoop);
  }, [playerSpeed, gameActive, checkCollisions, checkPowerUpCollection]);

  // Check for winner
  useEffect(() => {
    if (!gameActive || gameOver) return;

    if (playerPosition >= trackLength) {
      setGameActive(false);
      setWinner('Player');
      setScore(prev => prev + 1000);
      if (score + 1000 > highScore) setHighScore(score + 1000);
    } else {
      for (const car of computerCars) {
        if (car.position >= trackLength) {
          setGameActive(false);
          setGameOver(true);
          break;
        }
      }
    }
  }, [playerPosition, computerCars, gameActive, gameOver, score, highScore]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col items-center w-full h-screen ${nightMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-2xl text-red-900`}>
      <div className="w-full flex justify-between items-center mb-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
          TECH RACING
        </div>
        <button
          onClick={() => setNightMode(!nightMode)}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          {nightMode ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="bg-gray-700 w-full p-3 rounded-lg mb-4 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-sm text-gray-400">SCORE</div>
          <div className="text-xl text-red-400 font-bold">{score}</div>
        </div>

        <div className="flex flex-col">
          <div className="text-sm text-gray-400">HIGH SCORE</div>
          <div className="text-xl text-red-400 font-bold">{highScore}</div>
        </div>

        <div className="flex flex-col">
          <div className="text-sm text-gray-400">LEVEL</div>
          <div className="text-xl text-red-400 font-bold">{level}</div>
        </div>

        <div className="flex flex-col">
          <div className="text-sm text-gray-400">TIME</div>
          <div className={`text-xl font-bold ${timeLeft < 30 ? 'text-red-400 animate-pulse' : 'text-red-900'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {!gameActive && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-md">
            {gameOver ? (
              <>
                <h2 className="text-2xl font-bold text-red-500 mb-4">GAME OVER</h2>
                <p className="mb-4">Your score: {score}</p>
              </>
            ) : winner ? (
              <>
                <h2 className="text-2xl font-bold text-green-400 mb-4">LEVEL COMPLETE!</h2>
                <p className="mb-4">Your score: {score}</p>
              </>
            ) : (
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4">
                TECH RACING CHALLENGE
              </h2>
            )}

            <div className="mb-4 text-gray-300 text-sm">
              {!gameOver && !winner ? (
                <p>Race against AI cars, collect power-ups and avoid collisions!</p>
              ) : null}

              <p className="mt-2">Controls: Arrow keys to move and adjust speed</p>
              <div className="flex justify-center gap-4 mt-2">
                <span>⚡ = Speed Boost</span>
                <span>🛡️ = Shield</span>
              </div>
            </div>

            <button
              onClick={winner ? startNextLevel : startGame}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:from-red-700 hover:to-purple-700 font-bold transition-all transform hover:scale-105"
            >
              {winner ? 'Next Level' : 'Start Race'}
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full h-96 bg-gray-700 rounded-lg overflow-hidden shadow-inner mb-4">
        {/* Shield indicator */}
        {playerShielded && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white text-red-900 px-3 py-1 rounded-full text-sm z-50 animate-pulse">
            SHIELD ACTIVE
          </div>
        )}

        {/* Road with perspective */}
        <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full bg-gray-600" />
          <div className="w-1/3 h-full bg-gray-600" />
          <div className="w-1/3 h-full bg-gray-600" />
        </div>

        {/* Lane dividers */}
        <div className="absolute inset-0 flex justify-around">
          <div className="w-px h-full bg-white opacity-50" />
          <div className="w-px h-full bg-white opacity-50" />
        </div>

        {/* Road markings */}
        {roadMarkings.map((pos, index) => (
          <RoadMarking key={index} position={pos} />
        ))}

        {/* Night mode overlay */}
        {nightMode && (
          <div className="absolute inset-0 bg-blue-900 opacity-30 z-5" />
        )}

        {/* Finish line */}
        <div
          className="absolute w-full h-4 z-5"
          style={{
            bottom: `${trackLength}%`,
            backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 10px, #000 10px, #000 20px)'
          }}
        />

        {/* Power-ups */}
        {powerUps.map((powerUp) => (
          <PowerUp
            key={powerUp.id}
            type={powerUp.type}
            position={powerUp.position}
            laneNumber={powerUp.lane}
          />
        ))}

        {/* Cars */}
        <Car color="bg-red-600" position={playerPosition} laneNumber={playerLane} isPlayer={true} carType="racer" />

        {computerCars.map((car) => (
          <Car
            key={car.id}
            color={car.type === 'cyber' ? 'bg-red-600' : 'bg-red-400'}
            position={car.position}
            laneNumber={car.lane}
            isPlayer={false}
            carType={car.type}
          />
        ))}

        {/* Explosion effect */}
        {explosion && (
          <Explosion position={explosion.position} laneNumber={explosion.lane} />
        )}
      </div>

      {/* Game controls */}
      <div className="grid grid-cols-3 gap-4 w-full justify-items-center mb-4">
        <button
          className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-md focus:outline-none active:bg-gray-600"
          onClick={() => gameActive && setPlayerLane(prev => Math.max(prev - 1, 0))}
        >
          ←
        </button>
        <div className="grid grid-rows-2 gap-2">
          <button
            className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-md focus:outline-none active:bg-gray-600"
            onClick={() => gameActive && setPlayerSpeed(prev => Math.min(prev + 1, 10))}
          >
            ↑
          </button>
          <button
            className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-md focus:outline-none active:bg-gray-600"
            onClick={() => gameActive && setPlayerSpeed(prev => Math.max(prev - 1, 2))}
          >
            ↓
          </button>
        </div>
        <button
          className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-md focus:outline-none active:bg-gray-600"
          onClick={() => gameActive && setPlayerLane(prev => Math.min(prev + 1, 2))}
        >
          →
        </button>
      </div>

      {/* Speed meter */}
      <div className="w-full bg-gray-700 p-2 rounded-lg">
        <div className="text-xs mb-1 flex justify-between">
          <span>SPEED</span>
          <span>{playerSpeed} km/h</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full"
            style={{ width: `${(playerSpeed / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TechRacingGame;
