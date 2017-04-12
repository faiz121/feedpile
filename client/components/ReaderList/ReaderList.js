import React from 'react';
import Navbar from '../Navbar/Navbar';
import ReaderListItem from '../ReaderListItem/ReaderListItem';
import { connect } from 'react-redux';
import './ReaderList.css';

const ReaderList = (props) => {
  return (
    <div className="reader-list-container">
      <Navbar />
      {props.articles.map((article, index) => (
        <ReaderListItem article={article} key={index}/>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(`in mapStatetoProps ${JSON.stringify(state)}`);
  return {
    articles: state.articles
  }
};

export default connect(mapStateToProps)(ReaderList);