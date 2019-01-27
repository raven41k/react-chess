import Piece from './piece.js';
import Chess_White_King from '../figures/Chess_White_King.svg';
import Chess_Black_King from '../figures/Chess_Black_King.svg';

export default class King extends Piece {
  constructor(player){
    super(player, (player === 1? Chess_White_King : Chess_Black_King));
  }

  isMovePossible(src, dest){
    return (src - 9 === dest || 
      src - 8 === dest || 
      src - 7 === dest || 
      src + 1 === dest || 
      src + 9 === dest || 
      src + 8 === dest || 
      src + 7 === dest || 
      src - 1 === dest);
  }

  getSrcToDestPath(src, dest){
    return [];
  }
}
