mixins.crypto={data:()=>({crypto:"",cryptoStatus:""}),watch:{crypto(t){let r=this.$refs.crypto,s=this.$refs.content,{encrypted:c,shasum:e}=r.dataset;try{let r=CryptoJS.AES.decrypt(c,t).toString(CryptoJS.enc.Utf8);CryptoJS.SHA256(r).toString()===e?(this.cryptoStatus="success",s.innerHTML=r,this.render()):this.cryptoStatus="failure"}catch{this.cryptoStatus="failure"}}}};