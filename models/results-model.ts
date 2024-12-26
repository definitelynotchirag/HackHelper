class ResultModel {
    name: string;
    id: string;
    repoLink: string;
    createdAt: string;
    stars: number;
    forks: number;
    language: string;
    author: {
        authorAvatar: string;
        authorUname: string;
        authorProfile: string;
    } | undefined;
    topics: String[];
  
    constructor(data:any) {
      this.id = data.id;
      this.name = data.name;
      this.repoLink = data.repoLink;
      this.createdAt = data.createdAt;
      this.stars = data.stars;
      this.forks = data.forks;
      this.language = data.language;
      if (data.author) {
        this.author = {
          authorAvatar: data.author.authorAvatar,
          authorUname: data.author.authorUname,
          authorProfile: data.author.authorProfile
        };
      }
      this.topics = data.topics;
    }
  }
  
  export default ResultModel;