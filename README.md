# Panduan

## Mulai Menggunakan

```bash
npm install
npm run dev
```

## CSS

- untuk menambah css global bisa di : \_app.js, import aja biasa kek dibawah. karena nextjs 11 udah support built in css.

```js
import "../public/app.css";
```

- untuk yg page only, taro css lu di public/css/pagesnya. bisa kek diatas atau pake head gini.

```js
<Head>
	<link rel="stylesheet" href="/css/pagesnya/styleanda.css" />
</Head>
```

## Coloring

- untuk mengubah tema warna, bisa langsung ke components/styles/GlobalStyles.js lalu ada const namanya theme. tinggal lu sesuaikan dah.

```js
const theme = {
	primaryColor: "#007bff",
};
```

## Untuk Sidebar

- menu listing ada di lib/routes, tinggal tambah atau kurangi sesuka hati or sesuai figma :D
- componentnya terdapat di components/SidebarMenu.js

## Untuk Header

- langsung aja edit di components/Header.js

## Untuk Page yang tidak ingin menggunakan template

- components/page.js => ada const namanya NonDashboardRoutes
- lalu buat layout baru, dan sesuaikan di page.js tersebut tq.

## Untuk Notification

- untuk yg notifikasi error atau sukses tinggal import dari /utils/helpersBrowser.

- contoh import dan penggunaan pada saat get data api

```js
import { showError, showSuccess } from "../../utils/helpersBrowser";
const fetchData = async (data = pagination) => {
        setLoading(true);
        getRandomUser(data)
            .then((e) => {
                console.log(e);
                setPagination({ ...data, total: 200 });
                setPageData(e.results);
            })
            .catch((e) => showError(e.status, e.message))
            .finally(() => {
                setLoading(false);
            });

```

## Untuk Loading Global Page / Fullpage.

- Contoh

```js
import { useAppState } from "/components/shared/AppProvider";
const YourPage = () => {
	const [_state, dispatch] = useAppState();
	// to show loading :
	dispatch({ type: "showLoading" });

	// to hide loading :
	dispatch({ type: "hideLoading" });
};
```

## Untuk Fetching API

- TODO:.

<!-- ```js
import { FetcherPost } from "../utils/fetcher";
var response = await FetcherPost("/api/loginDummy", values);
``` -->

### Untuk Navigation

- import dlu function namanya PushNavigateTo atau ReplaceNavigateTo
- PushNavigateTo akan stor history, jadi bisa di back oleh browser
- ReplaceNavigateTo tidak akan store history jadi tidak bisa di back. useful jika tidak ingin user back incidentally misal dia udah login, ga boleh dong balik lagi ke login setelah di dashboard.

```js
import { PushNavigateTo, ReplaceNavigateTo } from "../utils/helpersBrowser";

if (response?.data?.code == 0) {
  Message.success("Sign complete. Taking you to your dashboard!").then(() =>
    ReplaceNavigateTo("/")
  );
}

<a onClick={() => { PushNavigateTo('/forgot') }}> Forgot Password <a/>
```

### Untuk Sessions

- import dlu function namanya handleSessions
- param buat handleSessions adalah context, dan needlogin.
- needlogin berguna jika ingin cek session tapi ga pengen di redirect ke /login klo doi belom login.
- data sessionnya bisa di akses di props.session

```js
import { handleSessions } from "../utils/helpers";

const SomePage = ({ session }) => {
	// session dari user :
	console.log(session);
};

// tempatkan dibawah sebelum export default
export async function getServerSideProps(context) {
	let checkSessions = await handleSessions(context, true);
	return checkSessions;
}

export default SomePage;
```

## ENV

- gw gasuka bikin file .env, tapi klo lu mau bikin bisa. tapi klo lu males ugha, silahkan ke next.config.js terus tambahin deh suka suka lu kek contoh dibawah. yg di nextconfig.js tapi di push ke git karena ga diignore. dan di server di pull juga. jadi be careful jgn masukkan settingan yg berbau local kesini.

```js
env: {
    backend: "https://nms-poc-api.devlabs.id",
    APPNAME: "boiler next js",
  }
```

## Row Col

- Row disini lu bisa pake sama ae kek bootstrap. cuman lebih bagus karena ada align, justify sama gutter.
- Col tapi sedikit berbeda, di bootstrap max 12 disini max 24.
- align buat vertical align bisa midle, top, bottom dll
- justify buat horizontal align bisa start, center, space-between dll

```js
import { Row, Col } from "antd";

<Row type="flex" align="middle" justify="start" gutter={[10, 10]}>
	<Col xs={12} sm={12} md={12} lg={12}>
		some content here 50%
	</Col>
	<Col xs={12} sm={12} md={12} lg={12}>
		some content here also 50%
	</Col>
</Row>;
```

### Contributing

- klo ada yg mau lu bagusin lagi, atau mau otak atik di boiler ini, sabi ae. dan agar tidak berantakan tolong jgn nambah package2 tidak jelas di package.json biar boiler ini tidak berat. serta tolong di cek linter nya dengan cara,

```shell
npm run initlint
```

- kalo hasilnya begini :

```shell
✔ No ESLint warnings or errors
```

- baru lu boleh push ke sini. otherwise fix dlu error klean ye.

## References

- Dokumentasi React <https://reactjs.org/docs/getting-started.html>
- Dokumentasi Next.js <https://nextjs.org/docs/getting-started>
- Dokumentasi ANTD <https://ant.design/components/overview/>
- Git template full yg tidak di optimize <https://github.com/DatasintesaID/templateone-fe.git>
- url preview live buat template <https://templateone-fe.vercel.app/>
