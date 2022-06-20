const path = require("path");
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: "./src/js/index.js", //자바스크립트파일의 진입점
    output: { //아웃풋 : 빌드했을 때 번들파일 관련 속성을 정해줌.
        filename : "bundle.js", //번들 파일 이름 지정
        path: path.resolve(__dirname,"./dist"), //번들 파일이 생성될 경로, __dirnamed은 웹팩이 절대 경로를 찾을 수 있게 하는 속성
        clean:true //번들 파일 경로에 이미 파일이 있으면, 그것을 지우고 새로운 번들을 생성하는 속성
    },
    devtool: "source-map", //소스맵 : 빌드한 파일과 원본 파일을 연결시켜줌
    mode: "development", //mode에는 production과 development가 있다. js, css, html에 대한 완독화 기능 제공??
    devServer:{
        host:"localhost",
        port:8080,
        open:true, //브라우저 새 창 열기
        watchFiles:'index.html' //index.html에 변화가 있을 때마다 rerolls 해주기
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "keyboard", //인터넷 브라우저의 탭에 보이는 속성
            template: "./index.html", //빌드시 템플릿으로 사용할 파일
            inject: "body", //파일을 빌드했을 때 자바스크립트 파일을 헤드 부분에 넣을 건지, 바디에 넣을건지 설정해주는 것. 입력하지 않으면 자바스크립트 태그가 head에 인젝트가 된다.
            favicon: "./favicon.ico"
        }), 
        new MiniCssExtractPlugin({
            filename:"style.css"
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ] //css 파일을 해당 로더를 이용해 불러오겠다는 규칙
    }, 
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}