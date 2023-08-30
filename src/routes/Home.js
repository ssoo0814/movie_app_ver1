import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";
import './Home.css';

class Home extends React.Component{
   
   state = {
    isLoading: true, 
    movies: [],  //영화데이터를 저장할 배열
   };
  
  getMovies = async ()=>{    
      const {
          data: {
              data: {movies},
          },
     } =  await axios.get('https://yts-proxy.now.sh/list_movies.json?sorty_by=rating');  //평점 내림차순 가져와주~
      // console.log(movies);    // movies.data.data.movies 점연산자 적용 ==> 구조 분해 할당하여 객체 구조화 ES6
      this.setState({movies, isLoading: false});
  };



   componentDidMount(){     
    
            //영화 앱을 데이터를 불러올것입니다. 
            //  setTimeout(()=>{this.setState({isLoading:false})},6000);
            //6초후에 isLoading State를 false로 바꾸자!
            this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;