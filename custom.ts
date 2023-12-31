
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://minecraft.makecode.com/blocks/custom
*/

/**
 * projectleaf
 */
//% weight=100 color=#191970 icon=""
namespace biotechnology {
    //% block
    enum ChemicalColor {
    C = 1,
    M = 2,
    Y = 4,
    B = 3,
    G = 5,
    R = 6,
    K = 7
    }
    /**
    * TODO: シアン
    */
    //% block
    export function C(){
        return 1
    }

    /**
    * TODO: マゼンタ
    */
    //% block
    export function M() {
        return 2
    }

    /**
    * TODO: イエロー
    */
    //% block
    export function Y() {
        return 4
    }
    let lockPos = world(-5, -14, 23)
    let putPos = world(1, 1, 14)

    let initFlag = false

    //パイプの押し出し処理
    function DischargePipe(chem: number, cnt: number): boolean {
        if (chem == ChemicalColor.C) {
            let placePos = world(4, 3, 21)
            player.say(">> " + cnt + "回目" + "抽出中.")
            blocks.fill(CYAN_STAINED_GLASS, placePos, placePos,FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)
            player.say(">> " + cnt + "回目" + "抽出中..")
            placePos = world(4, 4, 21)
            blocks.fill(CYAN_STAINED_GLASS, placePos, placePos, FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)
            player.say(">> " + cnt + "回目" + "抽出中...")
            placePos = world(4, 4, 20)
            blocks.fill(CYAN_STAINED_GLASS, placePos, placePos, FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)

        } else if (chem == ChemicalColor.M) {
            player.say(">> " + cnt + "回目" + "抽出中.")
            let placePos = world(4, 3, 17)
            blocks.fill(MAGENTA_STAINED_GLASS, placePos, placePos, FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)
            player.say(">> " + cnt + "回目" + "抽出中..")
            placePos = world(4, 4, 17)
            blocks.fill(MAGENTA_STAINED_GLASS, placePos, placePos, FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)
            player.say(">> " + cnt + "回目" + "抽出中...")
            placePos = world(4, 4, 18)
            blocks.fill(MAGENTA_STAINED_GLASS, placePos, placePos, FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)

        } else if (chem == ChemicalColor.Y) {
            player.say(">> " + cnt + "回目" + "抽出中...")
            let placePos = world(4, 3, 19)
            blocks.fill(YELLOW_STAINED_GLASS, placePos, placePos, FillOperation.Replace)
            //  デバッグ用
            loops.pause(500)

        } else if (chem < 0 || chem > 2) {
            return false
        }
        return true
    }

    /**
     * TODO: 2つの薬品を合成する
     */
    //% block
    export function SamplingChemicals(a: number, b: number): number {
        if (blocks.testForBlock(REDSTONE_BLOCK, lockPos)) {
            player.say(">>***システムロック中***")
            return -2
        }
        if (initFlag == false) {
            initFlag = true
            blocks.place(REDSTONE_BLOCK, world(4, -2, 16))
            blocks.place(AIR, world(4, -2, 16))
        }
        player.say(">>薬品の抽出を開始します")
        let a_result = !DischargePipe(a, 1)
        let b_result = !DischargePipe(b, 2)
        if (a_result && b_result) {
            player.say(">>薬品の抽出失敗")
            return -1
        }

        player.say(">>薬品の抽出完了")
        return a + b
    }

    /**
     * TODO: 薬品を注入する
     */
    //% block
    export function InjectChemical(chem: number) {

        if (blocks.testForBlock(REDSTONE_BLOCK, lockPos)) {
            player.say(">>***システムロック中***")
            return
        }

        let progress = "."
        let injectPos = 5
        let pipe = null
        if (chem == ChemicalColor.B) {
            pipe = BLUE_STAINED_GLASS

        } else if (chem == ChemicalColor.G) {
            pipe = GREEN_STAINED_GLASS

        } else if (chem == ChemicalColor.R) {
            pipe = RED_STAINED_GLASS

        } else if (chem == ChemicalColor.K) {
            pipe = BLACK_STAINED_GLASS

        } else {
            player.say(">>***薬品を注入することができません***")
            //blocks.place(REDSTONE_BLOCK, lockPos)
            return
        }

        for (let i = 0; i < 4; i++) {
            blocks.place(pipe, world(injectPos, 4, 19))
            player.say(">> 注入中" + progress)
            loops.pause(500)
            injectPos += 1
            progress += "."
        }
        if (chem == ChemicalColor.K) {
            player.say(">> 薬品投与結果:[反応あり]")
            blocks.place(AIR, putPos)
        } else {
            player.say(">> 薬品投与結果:[反応なし]")
        }

    }

    // loops.pause(5000)
    // let result = SamplingChemicals(C, M)
    // result = SamplingChemicals(Y, result)
    // InjectChemical(result)
}
