<template>
  <div class="linkWallet">
    <vHead :title="$t('home.lang29')" :back="back"></vHead>
    <div class="box">
      <div class="list">
        <div class="item  flex-wrap a-items jb" @click="linkWallet('bsc')">
          <div class="text flex-wrap a-items jb">
            <p class="msg flex-wrap"><img src="../assets/img/wallet/bsc.png" alt=""></p>
            <p class="num flex-wrap a-items flex-con jb">BSC</p>
          </div>
          <p class="flex-wrap a-items icon"><img src="../assets/img/wallet/checked.png" alt=""
              v-if="this.$store.getters.getChain == 'bsc'">
            <img src="../assets/img/wallet/check.png" alt="" v-else>
          </p>
        </div>
        <div class="item  flex-wrap a-items jb" @click="linkTrx">
          <div class="text flex-wrap a-items jb">
            <p class="msg flex-wrap"><img src="../assets/img/wallet/tron.png" alt=""></p>
            <p class="num flex-wrap a-items flex-con jb">TRX</p>
          </div>
          <p class="flex-wrap a-items icon"><img src="../assets/img/wallet/checked.png" alt=""
              v-if="this.$store.getters.getChain == 'trx'">
            <img src="../assets/img/wallet/check.png" alt="" v-else>
          </p>
        </div>
        <div class="item  flex-wrap a-items jb" style="border: none;" @click="linkWallet('eth')">
          <div class="text flex-wrap a-items jb">
            <p class="msg flex-wrap"><img src="../assets/img/wallet/ETH.png" alt=""></p>
            <p class="num flex-wrap a-items flex-con jb">ETH</p>
          </div>
          <p class="flex-wrap a-items icon"><img src="../assets/img/wallet/checked.png" alt=""
              v-if="this.$store.getters.getChain == 'eth'">
            <img src="../assets/img/wallet/check.png" alt="" v-else>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
const TronWeb = require('tronweb');
import Home from "../http/index.js";
import vHead from "../components/vHead.vue";
import { Dialog, Toast } from 'vant';
export default {
  name: "linkWallet",
  components: {
    vHead,
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {

  },
  methods: {
    getdata() {
      Home.get_user_info().then((res) => {
        
        if (res.data.walletid) {
          this.$store.commit('setWalletid', res.data.walletid)
        } else {
          this.$store.commit('setWalletid', '')
        }
        let _this = this
        setTimeout(() => {
          _this.back()
        }, 500)
      });
    },
    async linkTrx() {
      let _this = this
      if (window.tronWeb) {
        const isTPWallet = /TokenPocket|TPWallet/i.test(navigator.userAgent);
        if (!isTPWallet) {
          if (window.ethereum.isImToken) {
            let account = window.tronWeb.defaultAddress.base58
            if (account) {
              const message = window.tronWeb.toHex('TrustFi');
              window.tronWeb.trx.sign(message)
                .then(async signature => {
                  _this.$store.commit('setAccount', account)
                  _this.$store.commit('setChain', 'trx')
                  _this.getdata()
                })
                .catch(error => {
                  _this.$store.commit('setAccount', '')
                  _this.$store.commit('setChain', '')
                  _this.back()
                });
            }
          } else {
            const res = await window.tronLink.request({ method: 'tron_requestAccounts' })
            if (res.code == 200) {
              let obj = setInterval(async () => {
                if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                  clearInterval(obj)
                  let account = window.tronWeb.defaultAddress.base58
                  if (account) {
                    const message = 'TrustFi';
                    tronWeb.trx.signMessageV2(message)
                      .then(async signature => {
                        var base58Address = await tronWeb.trx.verifyMessageV2(message, signature);
                        if (base58Address === account) {
                          console.log('This is an authorized wallet');
                          _this.$store.commit('setAccount', account)
                          _this.$store.commit('setChain', 'trx')
                          _this.getdata()
                        } else {
                          _this.$store.commit('setAccount', '')
                          _this.$store.commit('setChain', '')
                          _this.back()
                          console.log('This is an observer wallet or the user declined the operation');
                        }
                      })
                      .catch(error => {
                        _this.$store.commit('setAccount', '')
                        _this.$store.commit('setChain', '')
                        _this.back()
                        console.error(error);
                      });

                  } else {
                    _this.$store.commit('setAccount', '')
                    _this.$store.commit('setChain', '')
                    _this.back()
                  }
                }
              }, 10)
            }
          }
        } else {
          let obj = setInterval(async () => {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
              clearInterval(obj)
              let account = window.tronWeb.defaultAddress.base58
              if (account) {
                const message = window.tronWeb.toHex('TrustFi');
                window.tronWeb.trx.sign(message)
                  .then(async signature => {
                    if (account === account) {
                      console.log('This is an authorized wallet');
                      _this.$store.commit('setAccount', account)
                      _this.$store.commit('setChain', 'trx')
                      _this.getdata()
                    } else {
                      _this.$store.commit('setAccount', '')
                      _this.$store.commit('setChain', '')
                      _this.back()
                      console.log('This is an observer wallet or the user declined the operation');
                    }
                  })
                  .catch(error => {
                    _this.$store.commit('setAccount', '')
                    _this.$store.commit('setChain', '')
                    _this.back()
                    console.error(error);
                  });

              } else {
                _this.$store.commit('setAccount', '')
                _this.$store.commit('setChain', '')
                _this.back()
              }
            }
          }, 10)
        }
      } else {
        Toast({
          message: this.$t('pulb.lang27'),
          position: 'bottom',
        });
      }

    },
    async linkWallet(chain) {
      let _this = this
      let accounts = await web3.eth.getAccounts()
      if (accounts[0]) {
        const message = 'TrustFi';
        web3.eth.personal.sign(message, accounts[0], (err) => {
          _this.$store.commit('setAccount', '')
          _this.$store.commit('setChain', '')
        })
          .then(async signature => {
              if (signature) {
                console.log('This is an authorized wallet');
                _this.$store.commit('setAccount', accounts[0])
                _this.$store.commit('setChain', chain)
                _this.getdata()
                _this.back()
              } else {
                _this.$store.commit('setAccount', '')
                _this.$store.commit('setChain', '')
                _this.back()
                console.log('This is an observer wallet or the user declined the operation');
              }

          })
          .catch(error => {
            console.error(error);
            _this.$store.commit('setAccount', '')
            _this.$store.commit('setChain', '')
            _this.back()

          });

      } else {
        window.ethereum.enable().catch(function (reason) {
          if (reason.code == 4001) {
            Toast({
              message: "User rejected provider access",
              position: 'bottom',
            });
          } else {
            Toast({
              message: "There was a problem signing you in",
              position: 'bottom',
            });
          }
        }).then(function (accounts) {
          if (accounts[0]) {
            const message = 'TrustFi';
            web3.eth.personal.sign(message, accounts[0], (err) => {
              _this.$store.commit('setAccount', '')
              _this.$store.commit('setChain', '')
              _this.back()
            })
              .then(async signature => {
                if (signature) {
                  console.log('This is an authorized wallet');
                  _this.$store.commit('setAccount', accounts[0])
                  _this.$store.commit('setChain', chain)
                  _this.getdata()
                  _this.back()
                } else {
                  _this.$store.commit('setAccount', '')
                  _this.$store.commit('setChain', '')
                  _this.back()
                  console.log('This is an observer wallet or the user declined the operation');
                }
              })
              .catch(error => {

              });
          } else {
            _this.$store.commit('setAccount', '')
            _this.$store.commit('setChain', '')
            _this.back()
          }
        });
      }

    },
    back() {
      this.$router.push('/index/home')
    },
    copy(url) {
      var input = document.createElement("input"); 
      input.value = url; 
      document.body.appendChild(input); 
      input.select(); 
      document.execCommand("Copy"); 
      document.body.removeChild(input); 
      Toast({
        message: this.$t('pulb.lang2'),
        position: 'bottom',
      });
    },
  },
};
</script>
<style scoped></style>
<style lang="scss">


.linkWallet {
  width: 100%;
  height: 100%;
  background: #13172A;

  .box {
    padding: 0.1rem 0.13rem;

    .list {
      background: #1A1F37;
      border-radius: 0.1rem;

      .item {
        padding: 0.18rem 0.14rem;

        .text {
          font-size: 0.14rem;

          .msg {
            margin-right: 0.11rem;

            img {
              width: 0.26rem;
              height: 0.26rem;
            }
          }

          .num {
            color: #A0A2AA;

            img {
              width: 0.16rem;
              height: 0.16rem;
            }
          }
        }

        .icon {
          img {
            width: 0.2rem;
            height: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
