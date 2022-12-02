export default class Like {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    this.persistData();
    return like;
  }
  removeLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.likes.splice(index, 1);
      this.persistData();
    }
  }
  isLiked(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    return index !== -1;
  }
  getNumberOfLikes() {
    return this.likes.length;
  }
  persistData() {
    localStorage.setItem('likes',JSON.stringify(this.likes))
  }
  readData() {
    const data = localStorage.getItem('likes');
    if (data) {
      this.likes = JSON.parse(data);
    }
  }
}
