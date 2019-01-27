import Piece from './piece.js';
import Chess_White_Queen from '../figures/Chess_White_Queen.svg';
import Chess_Black_Queen from '../figures/Chess_Black_Queen.svg';

export default class Queen extends Piece {
  constructor(player){
    super(player, (player === 1? Chess_White_Queen : Chess_Black_Queen));
  }

  isMovePossible(src, dest){
    let mod = src % 8;
    let diff = 8 - mod;
    
    return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0) ||
      (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
  }

  getSrcToDestPath(src, dest){
    let path = [], pathStart, pathEnd, incrementBy;
    if(src > dest){
      pathStart = dest;
      pathEnd = src;
    }
    else{
      pathStart = src;
      pathEnd = dest;
    }
    if(Math.abs(src - dest) % 8 === 0){
      incrementBy = 8;
      pathStart += 8;
    }
    else if(Math.abs(src - dest) % 9 === 0){
      incrementBy = 9;
      pathStart += 9;
    }
    else if(Math.abs(src - dest) % 7 === 0){
      incrementBy = 7;
      pathStart += 7;
    }
    else{
      incrementBy = 1;
      pathStart += 1;
    }

    for(let i = pathStart; i < pathEnd; i+=incrementBy){
      path.push(i);
    }
    return path;
  }
}