import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor() { }
  userServiceBasepath = "https://localhost:7206/api/User/";
  searchUserByUserName = this.userServiceBasepath + "GetUser/";
  updateUser=this.userServiceBasepath+"UpdateUser/";
  register = this.userServiceBasepath + "Register";
  getAllUsers=this.userServiceBasepath+"GetAllUsers";
  blockUserbyAdmin=this.userServiceBasepath+"BlockUser/";
  unblockUserbyAdmin=this.userServiceBasepath+"UnblockUser/";
  makeAdmin=this.userServiceBasepath+"makeAdmin/";
  removeAdmin=this.userServiceBasepath+"removeAdmin/"
  isblockbyAdmin=this.userServiceBasepath+"isBlockedByAdmin/";
  isAdmin=this.userServiceBasepath+"isAdmin/";
  updateUserByAdmin=this.userServiceBasepath+"UpdateUserbyAdmin/";
  //password reset
  passwordResetBasePath="https://localhost:7206/api/PasswordReset/";
  sendMail=this.passwordResetBasePath+"RequestPasswordReset/";
  resetPass=this.passwordResetBasePath+"ResetPassword"



  LoginServiceBasepath = "https://localhost:7206/api/Login/";
  login = this.LoginServiceBasepath + "Login";

  SearchBasePath="https://localhost:7252/api/Search/"
  UserSearchBasePath =this.SearchBasePath+"getUserResult/";
  hashSearchBasePath =  this.SearchBasePath+"getHashResult/";

  
  FollowBlockBasePath = "https://localhost:7020/api/FollowBlock/";
  newFollow=this.FollowBlockBasePath+"Create/";
  unfollow=this.FollowBlockBasePath+"Delete/";
  checkFollow=this.FollowBlockBasePath+"IsFollowed/";
  followerFollowingCount=this.FollowBlockBasePath+"GetFollowFollowingCount/";
  blockUser=this.FollowBlockBasePath+'Block/';
  unBlockUser = this.FollowBlockBasePath+'Unblock/';
  isBlocked=this.FollowBlockBasePath+'IsBlocked/';
  blocklist=this.FollowBlockBasePath+'GetBlockedUsers/';
  unblock=this.FollowBlockBasePath+'Unblock/';
  getfollowing=this.FollowBlockBasePath+'GetFollowedUsers/';
  getfollowers=this.FollowBlockBasePath+'GetFollowerUsers/';

  tweetServiceBasePath="https://localhost:7020/api/Tweet/";
  createTweet="https://localhost:7020/api/Tweet";
  deleteTweet="https://localhost:7206/api/Login/DeleteTweet/"

  getTweetByTweetId=this.tweetServiceBasePath+'GetTweet/';


  //likeCommentRetweet
  likeCommentRetweetBasePath="https://localhost:7020/api/LikeCommentRetweet/";
  likeorDeletelike=this.likeCommentRetweetBasePath+"CreateOrDeleteLike/";
  CreateOrDeleteRetweet=this.likeCommentRetweetBasePath+"CreateOrDeleteReTweet/";
  getlikecommentretweet=this.likeCommentRetweetBasePath+"getLikecommentRetweet/";
  createComment = this.likeCommentRetweetBasePath+"CreateComment/";
  deleteComment=this.likeCommentRetweetBasePath+"DeleteComment/";


  timelineBasePath="https://localhost:7020/api/TimelineTweetsControllers/";
  getalltweet=this.timelineBasePath+"getTweets/";
  getalltweetRedis=this.timelineBasePath+"getTweetsRedis/";
  getSpecificUsertweet=this.timelineBasePath+'getSpecificTweet/';
  getTweetbyUserName=this.timelineBasePath+'getTweetsbyuserName/';

  notificationsBasePath ="https://localhost:7020/api/Notifications/";
  
}
