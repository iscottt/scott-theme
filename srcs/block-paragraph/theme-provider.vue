<template>
	<n-config-provider
	:locale="locale"
	:theme-overrides="themeOverridesAuto()"
	:theme="store.state.isDark ? darkTheme : undefined"
	>	
		<n-notification-provider>
			<n-dialog-provider>
				<n-message-provider>
					<n-loading-bar-provider>
						<slot />
					</n-loading-bar-provider>
				</n-message-provider>
			</n-dialog-provider>
		</n-notification-provider>
	</n-config-provider>
</template>

<script>

const {
	"zh-CN": zhCN,
	configProvider: NConfigProvider,
	messageProvider: NMessageProvider,
	loadingBarProvider: NLoadingBarProvider,
	notificationProvider: NNotificationProvider,
	dialogProvider: NDialogProvider,
	element: NEl,
	dark: darkTheme,
} = nv.components

export default {
	name: 'theme-wrapper',
	components: {
		NConfigProvider,
		NMessageProvider,
		NLoadingBarProvider,
		NDialogProvider,
		NNotificationProvider,
		NEl,
	},
	props: ['store'],
	data(){return {
		locale: zhCN,
		darkTheme: darkTheme,
		themeOverrides: {
			common: {
				fontFamily: '微软雅黑,Microsoft YaHei UI,Microsoft YaHei,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif',

				analogousColor: '#bfe',

				primaryColor: '#007dff',
				primaryColorHover: '#3196ff',
				primaryColorPressed: '#276ceb',
				primaryColorSuppl: '#3196ff',

				secondaryColor: '#4ebbff',

				infoColor:'#409eff',
				infoColorHover:'#66b1ff',
				infoColorPressed:'#3a8ee6',
				infoColorSuppl:'#66b1ff',

				successColor:'#67c23a',
				successColorHover:'#85ce61',
				successColorPressed:'#5daf34',
				successColorSuppl:'#85ce61',

				warningColor:'#e6a23c',
				warningColorHover:'#ebb563',
				warningColorPressed:'#cf9236',
				warningColorSuppl:'#ebb563',

				errorColor:'#f56c6c',
				errorColorHover:'#f78989',
				errorColorPressed:'#dd6161',
				errorColorSuppl:'#f78989',

				borderRadius: "6px",
				borderRadiusSmall: "3px",
				fullLoadingBg: "rgba(255,255,255,.5)",
				bgColor: "#f0f2f7",

				primaryOpacity0: "rgba(0,125,255,0)",
				primaryOpacity1: "rgba(0,125,255,.1)",
				primaryOpacity2: "rgba(0,125,255,.2)",
				primaryOpacity3: "rgba(0,125,255,.3)",
				primaryOpacity4: "rgba(0,125,255,.4)",
				primaryOpacity5: "rgba(0,125,255,.5)",
				primaryOpacity6: "rgba(0,125,255,.6)",
				primaryOpacity7: "rgba(0,125,255,.7)",
				primaryOpacity8: "rgba(0,125,255,.8)",
				primaryOpacity9: "rgba(0,125,255,.9)",

				whiteOpacity0: "rgba(255,255,255,0)",
				whiteOpacity1: "rgba(255,255,255,.1)",
				whiteOpacity2: "rgba(255,255,255,.2)",
				whiteOpacity3: "rgba(255,255,255,.3)",
				whiteOpacity4: "rgba(255,255,255,.4)",
				whiteOpacity5: "rgba(255,255,255,.5)",
				whiteOpacity6: "rgba(255,255,255,.6)",
				whiteOpacity7: "rgba(255,255,255,.7)",
				whiteOpacity8: "rgba(255,255,255,.8)",
				whiteOpacity9: "rgba(255,255,255,.9)",
				whiteDefault: "#fff",

				gray0: "#1F2D3D",
				gray1: "#324057",
				gray2: "#475669",
				gray3: "#8492A6",
				gray4: "#99A9BF",
				gray5: "#C0CCDA",
				gray6: "#D3DCE6",
				gray7: "#E5E9F2",
				gray8: "#EFF2F7",
				gray9: "#F9FAFC",

				grayOpacity0: "rgba(31,45,61,0)",
				grayOpacity1: "rgba(31,45,61,.1)",
				grayOpacity2: "rgba(31,45,61,.2)",
				grayOpacity3: "rgba(31,45,61,.3)",
				grayOpacity4: "rgba(31,45,61,.4)",
				grayOpacity5: "rgba(31,45,61,.5)",
				grayOpacity6: "rgba(31,45,61,.6)",
				grayOpacity7: "rgba(31,45,61,.7)",
				grayOpacity8: "rgba(31,45,61,.8)",
				grayOpacity9: "rgba(31,45,61,.9)",
			},
			Dialog: {
				borderRadius: '16px'
			},
			Button: {
				borderRadiusSmall: "4px"
			},
		},
		themeOverridesDark: {
			common: {
				fullLoadingBg: "rgba(0,0,0,.5)",

				primaryColor: '#409eff',
				primaryColorHover: '#53aeff',
				primaryColorPressed: '#276ceb',
				primaryColorSuppl: '#53aeff',

				bgColor: "#18181c",
				bgColorDarker: "#000",
				borderColor: "#333",

				primaryOpacity0: "rgba(64,158,255,0)",
				primaryOpacity1: "rgba(64,158,255,.1)",
				primaryOpacity2: "rgba(64,158,255,.2)",
				primaryOpacity3: "rgba(64,158,255,.3)",
				primaryOpacity4: "rgba(64,158,255,.4)",
				primaryOpacity5: "rgba(64,158,255,.5)",
				primaryOpacity6: "rgba(64,158,255,.6)",
				primaryOpacity7: "rgba(64,158,255,.7)",
				primaryOpacity8: "rgba(64,158,255,.8)",
				primaryOpacity9: "rgba(64,158,255,.9)",

				whiteOpacity0: "rgba(30,30,34,0)",
				whiteOpacity1: "rgba(30,30,34,.1)",
				whiteOpacity2: "rgba(30,30,34,.2)",
				whiteOpacity3: "rgba(30,30,34,.3)",
				whiteOpacity4: "rgba(30,30,34,.4)",
				whiteOpacity5: "rgba(30,30,34,.5)",
				whiteOpacity6: "rgba(30,30,34,.6)",
				whiteOpacity7: "rgba(30,30,34,.7)",
				whiteOpacity8: "rgba(30,30,34,.8)",
				whiteOpacity9: "rgba(30,30,34,.9)",
				whiteDefault: "#1e1e22",

				gray0: "#fff",
				gray1: "#E5E9F2",
				gray2: "#C0CCDA",
				gray3: "#bec9d5",
				gray4: "#a5b0b9",
				gray5: "#8c90a0",
				gray6: "#73869a",
				gray7: "#2d2d30",
				gray8: "#323236",
				gray9: "#36363a",

				grayOpacity0: "rgba(0,0,0,0)",
				grayOpacity1: "rgba(0,0,0,.1)",
				grayOpacity2: "rgba(0,0,0,.2)",
				grayOpacity3: "rgba(0,0,0,.3)",
				grayOpacity4: "rgba(0,0,0,.4)",
				grayOpacity5: "rgba(0,0,0,.5)",
				grayOpacity6: "rgba(0,0,0,.6)",
				grayOpacity7: "rgba(0,0,0,.7)",
				grayOpacity8: "rgba(0,0,0,.8)",
				grayOpacity9: "rgba(0,0,0,.9)",
			},
			Scrollbar: {
				color: "rgba(255,255,255,.1)",
				colorHover: "rgba(255,255,255,.2)"
			},
		}
	}},
	mounted() {
	},
	methods: {
		themeOverridesAuto(color) {
			var themeOverrides = JSON.parse(JSON.stringify({v:this.themeOverrides})).v;
			
			if (!this.store.state.isDark) {
				return themeOverrides;
			} else {
				var result = {
					...themeOverrides
				};
				for (var key in this.themeOverridesDark) {
					if (result[key]) {
						result[key] = {
							...result[key],
							...this.themeOverridesDark[key]
						}
					} else {
						result[key] = this.themeOverridesDark[key];
					}
				}
				return result;
			}
		}
	}
	
}
</script>