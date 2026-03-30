import {  Download, expect, Locator, Page } from "@playwright/test"
import fs from "fs"

export default class DocumentPage {
    page : Page
    /*page elements*/
    readonly fromCalendarButton : Locator;
    readonly calendarContainer : Locator;
    readonly toCalendarButton : Locator;
    readonly weekButton : Locator;
    readonly submitButton : Locator;
    readonly blockOverlay : Locator ;
    readonly alertEmptyText : Locator;
    readonly gridDataContainer : Locator;
    /*grid elements*/
    readonly editDocumentsButton : Locator;
    readonly popupEditContainer : Locator;
    readonly cellOnTableText : Locator;
    readonly cellDateTableText : Locator;
    readonly cellIncotermTableText : Locator;
    readonly cellAmountTableText : Locator;
    readonly popupSupplierFieldsText : Locator;
    readonly popupClientFieldsText : Locator;
    readonly popupDateFieldsText: Locator;
    readonly popupIncotermFieldsText : Locator;
    readonly exportButton : Locator;
    readonly exportContainer : Locator;
    readonly exportNameInput : Locator;
    readonly radioButton : Locator;
    readonly popupExportButton : Locator;

    legendWithoutResult : string = "No se encontraron registros que concuerden con el criterio de búsqueda"
    headerExcel : string = "Importador/Exportador	Empresa agente	Proveedor	Cliente	Tipo	Nro	Fecha	Incoterm	Moneda	Valor	FOB	Estado	Cantidad	Peso	Tipo de pase	Fecha pase	Embarques	Referencia"
    constructor( page : Page){
        this.page = page
         /*page elements*/
        this.fromCalendarButton = page.locator('span[name="btn_dpsm_dde"]');
        this.calendarContainer = page.locator('.calendar');
        this.weekButton = page.locator('.wn')
        this.toCalendarButton = page.locator('span[name="btn_dpsm_hha"]');
        this.submitButton = page.getByRole('button', { name: 'Buscar' });
        this.blockOverlay = page.locator('.blockOverlay');
        this.alertEmptyText = page.locator('.msg_alert_empty_rows');
        this.gridDataContainer = page.locator(".grilla_datos");
        /*grid elements*/
        this.editDocumentsButton = page.locator(`span[title="Editar documento"]`);
        this.popupEditContainer = page.getByRole('dialog', { name: 'SIDOM - Documentos' })
        this.cellOnTableText = page.getByRole('cell', { name: '' });
        this.cellDateTableText = page.locator('.Celda_Fecha');
        this.cellIncotermTableText = page.locator('.Celda_especial');
        this.cellAmountTableText = page.locator('.Celda_Importe');
        this.popupSupplierFieldsText = page.locator('#psm_doc_ite_cab_nomb_prov');
        this.popupClientFieldsText = page.locator('#psm_doc_ite_cab_nomb_cli');
        this.popupDateFieldsText = page.locator('#psm_doc_ite_cab_fecha');
        this.popupIncotermFieldsText = page.locator('#psm_doc_ite_cab_incoterm');
        this.exportButton = page.getByRole('button', { name: 'Exportar a Excel' });
        this.exportContainer = page.locator(".jBox-container")
        this.exportNameInput = page.getByRole('textbox', { name: 'Nombre de archivo.' })
        this.radioButton = page.getByRole("radio", { name: "Archivo TXT de Excel"});
        this.popupExportButton = page.getByRole('button', { name: 'Exportar', exact: true })
    }

    async selectDateRange(from : string, to : string){
        await this.openCalendar(this.fromCalendarButton, 0)
        await this.selectDate(0, from)

        await this.openCalendar(this.toCalendarButton, 1)
        await this.selectDate(1,to)
    };

    async openCalendar (locator : Locator, list : number) {
        await locator.click()
        await expect(this.calendarContainer.nth(list)).toBeVisible()
    };

    async selectDate( index : number, day : string) {
        const calendar = this.calendarContainer.nth(index)
        await calendar.locator(".day:not(.wn)",{  hasText : day }).click()
        await expect(calendar).toBeHidden()
    };

    async submitFormDocument (){
        await this.submitButton.click()
        await this.blockOverlay.waitFor({state:"hidden"})
    };

    async validateResultOfDocuments () {
        const element  = await this.alertEmptyText.count();
        
        if(element == 1) {
            return  expect(this.alertEmptyText).toContainText(this.legendWithoutResult)
        } else if(element > 0 ){
          return expect(this.gridDataContainer).toBeVisible()
        }
    };

    async openEditFirstDocuments (){
        await this.editDocumentsButton.first().click()
        await expect(this.popupEditContainer).toBeVisible()
    };

    async getDataOnGrid(){
        return {
            supplier : await this.cellOnTableText.nth(2).innerText(),
            client : await this.cellOnTableText.nth(3).innerText(),
            dateDocument: await this.cellDateTableText.nth(0).innerText(),
            incoterm : await this.cellIncotermTableText.nth(1).innerText(),
        }
    };

    async validateDataEditDocuments (){
        const data = await  this.getDataOnGrid()
        await this.openEditFirstDocuments()

        await expect(this.popupSupplierFieldsText).toContainText(data.supplier)
        await expect(this.popupClientFieldsText).toContainText(data.client)
        await expect(this.popupDateFieldsText).toContainText(data.dateDocument)
        await expect(this.popupIncotermFieldsText).toContainText(data.incoterm)
    };

    async openExportToExcel () {
        await this.exportButton.click()
        await expect(this.exportContainer).toBeVisible()
    };

    async  completeDataFromPopupExcel (name : string){
      await this.openExportToExcel()
      await this.exportNameInput.fill(name)
      await this.radioButton.click()      
    };

  
async validateDownload() {
  const [download] = await Promise.all([
    this.page.waitForEvent("download"),
    this.popupExportButton.click(),
  ]);

  const filePath = `./downloads/${download.suggestedFilename()}`;
  await download.saveAs(filePath);
  const header = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)[0];
  expect(header).toContain(this.headerExcel);
}

}