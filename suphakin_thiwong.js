function quickestPath({portals}) {
    const portalMap = new Map();
    for (const portal of portals) {
      portalMap.set(portal.location, portal.destination);
    }
    
    const queue = [{ position: 1, rolls: [] }];
    const visited = new Set([1]);
    
    while (queue.length > 0) {
      const { position, rolls } = queue.shift();
      
      for (let dice = 1; dice <= 6; dice++) {
        const nextPosition = position + dice;
        
        if (nextPosition === 100) {
          return [...rolls, dice];
        }
        
        if (nextPosition > 100) {
          continue;
        }
        
        let finalPosition = nextPosition;
        if (portalMap.has(nextPosition)) {
          finalPosition = portalMap.get(nextPosition);
        }
        
        if (!visited.has(finalPosition)) {
          visited.add(finalPosition);
          queue.push({
            position: finalPosition,
            rolls: [...rolls, dice]
          });
        }
      }
    }
    
    return [];
  }
  
  const portals = [
    {"location": 55, "destination": 38},
    {"location": 14, "destination": 35},
    {"location": 91, "destination": 48},
    {"location": 30, "destination": 8},
    {"location": 31, "destination": 70},
    {"location": 63, "destination": 83},
    {"location": 3, "destination": 39},
    {"location": 47, "destination": 86},
    {"location": 71, "destination": 93},
    {"location": 21, "destination": 4},
    {"location": 44, "destination": 65},
    {"location": 96, "destination": 66},
    {"location": 79, "destination": 42},
    {"location": 87, "destination": 54}
  ];
  
  const result = quickestPath({ portals });
  console.log(result); // Should output [2, 5, 6, 6, 1]