import * as GC from '@mescius/spread-sheets'
import '@mescius/spread-sheets-resources-ja';
import '@mescius/spread-sheets-collaboration-addon';
import { Client } from "@mescius/js-collaboration-client";
import * as OT from "@mescius/js-collaboration-ot-client";
import { type, bind } from '@mescius/spread-sheets-collaboration-client';
import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

// ライセンスの設定
//GC.Spread.Sheets.LicenseKey = 'ここにSpreadJSの共同編集機能が有効なライセンスキーを設定します';

// typeを登録
OT.TypesManager.register(type);

window.onload = async () => {
  // ワークブックの生成
  const workbook = new GC.Spread.Sheets.Workbook('ss');

  // カルチャの設定
  GC.Spread.Common.CultureManager.culture('ja-jp');

  // サーバーに接続し、ルームに参加
  const conn = new Client().connect('room1');
  const doc = new OT.SharedDoc(conn);

  // エラー監視
  doc.on('error', (err) => console.error(err));
  await doc.fetch();

  // ドキュメントが存在しない場合は初期化
  if (!doc.type) {
    await doc.create(workbook.collaboration.toSnapshot(), type.uri, {});
    bind(workbook, doc);
  } else {
    bind(workbook, doc);
  }
}