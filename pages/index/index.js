// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_imgls:[
      
      {id:1, imgurl:"https://www.dmoe.cc/random.php"},
      {id:2, imgurl:"https://cdn.seovx.com/d/?mom=302"},
      {id:3, imgurl:"https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/"},
      {id:4, imgurl:"https://api.ixiaowai.cn/api/api2.php"},
      {id:5, imgurl:"https://api.dujin.org/pic/yuanshen/"}
    
    ],
    img_ls:[],
  bdstyle:{},
  ipv:'',
  URL:'https://pic.sogou.com/napi/pc/searchList?mode=1&start=96&xml_len=48&query=明日方舟'
},
  inputdata(e){
    this.setData({
      ipv:e.detail.value,
    });
  },
  but:function(){
    this.setData({
      URL:"https://pic.sogou.com/napi/pc/searchList?mode=1&start=96&xml_len=48&query="+this.data.ipv,
    });
    this.req(this.data.URL);
  },

  req:function(URL){
    var img_ls=[];
    var bdstyle={};
    wx.request({
      url: URL,
      success:(res)=>{
        let c = 0;
        for(const i of res.data.data.items){
          img_ls.push({"id":c,"imgurl":i.thumbUrl})
          c++;
          var calssname='body_'+c
      bdstyle[calssname]='width:48vw;border: 10rpx solid hsl(203, 92%, 75%, 0.5);background-color:rgba(0, 89, 255, 0.3);';
        }
      this.setData({
        img_ls:img_ls,
        bdstyle:bdstyle
      });
    },
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {this.req(this.data.URL)},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})