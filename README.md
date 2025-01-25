# blog_front

[blog](https://github.com/umanari145/blog)のfrontを切り出し

## ディレクトリ構成

- .github/workflows・・S3へのアップロード
- build・・buildコマンド時に成果物が吐き出される場所
- public・・buildの元
- src・・実際のreactのソースが入っている
  - class・・型
  - layout・・htmlのパーツ
  - pages・・routeから飛んできた時のページ
  - parts・・Paginationなどのhtmlのパーツ
  - App.tsx・・エントリーポイント
- .env・・ローカル用の環境変数(実環境はCICDで環境変数を入れるので)

プロジェクトスタート

```
docker exec -it blog_front_node sh
pwd /app
# プロジェクトの作成
npx create-react-app front --template typescript
npm start ここでホットリロードができる

http://localhost:3000/ でアクセスできる
```

ビルド&成果物のデプロイ

```
cd /app/front
npm run build
# dockerの外
aws s3 sync build s3://skill-up-engineering
```

https://qiita.com/orange5302/items/2e005974d055b3c454d9

## 環境変数登録(GithubActions)

```
gh auth login
#ブラウザアクセスして認証取る
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as umanari145
! You were already logged in to this account

source  ../blog/infra/aws_configure.txt
gh secret set AWS_ACCESS_KEY_ID --body "$AWS_ACCESS_KEY_ID" --repo umanari145/blog_front
gh secret set AWS_SECRET_ACCESS_KEY --body "$AWS_SECRET_ACCESS_KEY" --repo umanari145/blog_front
gh secret set API_ENDPOINT --body "$API_ENDPOINT" --repo umanari145/blog_front
gh secret set APP_DOMAIN --body "$APP_DOMAIN" --repo umanari145/blog_front
gh secret set S3_BUCKET_NAME --body "$S3_BUCKET_NAME" --repo umanari145/blog_front
```
