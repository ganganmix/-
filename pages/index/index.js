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
  URL:'https://pic.sogou.com/napi/pc/searchList?mode=1&start=96&xml_len=24&query=明日方舟'
},
  inputdata(e){
    this.setData({
      ipv:e.detail.value,
    });
  },
  // 按键点击事件
  async but(){
    var url = "https://pic.sogou.com/napi/pc/searchList?mode=1&start=96&xml_len=48&query="+this.data.ipv;
    this.requ(url).then(res=>{
      this.play(res).then(rec=>{
        this.setData({
          img_ls:res,
          bdstyle:rec,
          URL:url
        })
      })
    })
  },

  // request函数
  async requ(URL){
      const c = await new Promise((resoile)=>{wx.request({
        url: URL,
        method:"GET",
        success:({data:res})=>{
          var l = 0;
          var c = [];
          for(const i of res.data.items){
            c.push({"id":l, "url":i.thumbUrl})
            l++
          }
          resoile(c);
        },
        fail:(res)=>{
          wx.showModal({
            title: 'error',
            content: "requ错误"
          })
        },
    })})
    return c
},

  async play(url_ls){
    var bdstyle = {};
    for(const i of url_ls){
      var classname="body_"+i.id
      bdstyle[classname]='width:48vw;border: 10rpx solid hsl(203, 92%, 75%, 0.5);background-color:rgba(0, 89, 255, 0.3);';
    }
    return bdstyle
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.requ(this.data.URL).then(res=>{
      this.play(res).then(rec=>{
        this.setData({
          img_ls:res,
          bdstyle:rec
        })
      })
    })
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
    var re_url = this.data.URL
    var mode = re_url.slice(41, 46)
    var re_mode = mode+Number(re_url[46])
    var ne_mode = mode+[Number(re_url[46])+1]
    var ne_url = re_url.replace(re_mode, ne_mode)
    this.requ(ne_url).then(res =>{
      var img_ls = this.data.img_ls.concat(res)
      this.play(res).then(rec=>{
        var bdstyle = {...this.data.bdstyle, ...rec}
        this.setData({
          URL:ne_url,
          bdstyle:bdstyle,
          img_ls:img_ls
        })
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})