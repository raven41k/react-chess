import Piece from './piece.js';
import Chess_White_Knight from '../figures/Chess_White_Knight.svg';
import Chess_Black_Knight from '../figures/Chess_Black_Knight.svg';

export default class Knight extends Piece {
  constructor(player){
    super(player, (player === 1? Chess_White_Knight : Chess_Black_Knight));
  }

  isMovePossible(src, dest){
    return (src - 17 === dest || 
      src - 10 === dest || 
      src + 6 === dest || 
      src + 15 === dest || 
      src - 15 === dest || 
      src - 6 === dest || 
      src + 10 === dest || 
      src + 17 === dest);
  }

  getSrcToDestPath(){
    return [];
  }
}
