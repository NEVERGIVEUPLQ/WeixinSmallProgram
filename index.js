//index.js
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //
    iBeacon: []
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getiBeaconInfo();
  },
  


  /**
       * 获取蓝牙设备信息
       */
  getiBeaconInfo: function () {
    var that = this;
    //是否正确打开蓝牙
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("正常打开蓝牙适配器！");
        //开始搜索附近的蓝牙设备
        wx.startBluetoothDevicesDiscovery({
          success: function (res) {
            //获取在蓝牙模块生效期间所有已发现的蓝牙设备
            wx.getBluetoothDevices({
              success: function (res) {
               // console.log("获取蓝牙设备成功" + ",获取到蓝牙" + res.devices.length + "个");
                //查看iBeacon获取到的个数
                var j = 0;
                //定义一个对象数组来接收iBeacon的信息
                var arrayIBeaconInfo=[];
                var objectIBeaconInfo = { ids: '', rssis:0};
                for (var i = 0; i < res.devices.length; i++) {
                 // console.log(res.devices[i].RSSI, res.devices[i].deviceId);
                  //获取特定的八个iBeaon，其中这些具体的deviceId可以在智石提供的软件BrightBeacon中的获取，在BrightBeacon中，deviceId是对应的MAC
                  if (res.devices[i].deviceId == 'AC:23:3F:20:D3:81' || res.devices[i].deviceId == 'AC:23:3F:20:D3:7D' || res.devices[i].deviceId == 'AC:23:3F:20:D3:7A' || res.devices[i].deviceId == 'AC:23:3F:20:D3:80' || res.devices[i].deviceId == 'AC:23:3F:20:D3:75' || res.devices[i].deviceId == 'AC:23:3F:20:D3:83' || res.devices[i].deviceId == 'AC:23:3F:20:D3:7F' || res.devices[i].deviceId == 'AC:23:3F:20:D3:84') {
                    objectIBeaconInfo = { ids: res.devices[i].deviceId, rssis: res.devices[i].RSSI };
                    // objectIBeaconInfo.ids = res.devices[i].deviceId;
                    // objectIBeaconInfo.rssis = res.devices[i].RSSI;
                    //将对象加入到iBeacon数组中
                    arrayIBeaconInfo.push(objectIBeaconInfo);
                    j++;
                  }
                  
                }
                
                //冒泡算法，将rssi值从大到小
                //temp为中间值
                var temp;
                for (var i = 0; i < arrayIBeaconInfo.length; i++) {
                  for (var j = i + 1; j < arrayIBeaconInfo.length; j++) {
                   // console.log("正在执行冒泡算法");
                    if (Math.abs(arrayIBeaconInfo[j].rssis) <= Math.abs(arrayIBeaconInfo[i].rssis)) {
                      temp = arrayIBeaconInfo[i];
                      arrayIBeaconInfo[i] = arrayIBeaconInfo[j];
                      arrayIBeaconInfo[j] = temp;
                    }
                  }
                  
                }
                //将对象存入data中
                that.setData({
                  iBeacon: arrayIBeaconInfo,
                })
                //实时改变全局变量的值
                app.globalData.iBeaconInfo = arrayIBeaconInfo;
               // console.log("获取了多少个iBeacon",j);
              },
              fail: function (res) {
                console.log("获取蓝牙设备失败！");
              }
            })
          },
          fail: function (res) {
            console.log("搜索附近蓝牙失败！");
          }
        })
      },
      fail: function (res) {
        console.log("没有打开蓝牙适配器");
      },
      complete: function (res) {
        //complete
      }
    })
  },




 


  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    var that=this
     wx.openBluetoothAdapter({
       success: function(res) {
         console.log("正确打开蓝牙适配器");
         //页面初次渲染完成后每个1s进行刷新
         setInterval(that.onLoad, 500);
       },
       fail: function (res){
         wx.showModal({
           title: '提示',
           content: '是否打开手机蓝牙？',
           showCancel: true,
           cancelText: '否',
           cancelColor: 'black',
           confirmText: '是',
           confirmColor: '#44ADE2',
           success: function(res) {
             if (res.cancel){
               wx.showModal({
                 title: '提示',
                 content: '请前往手机设置打开蓝牙',
               });
               //页面初次渲染完成后每个3s进行刷新
              setInterval(that.onLoad, 500);
             }
           },
           
         })
       }
     })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
