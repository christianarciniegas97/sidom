import { Locator, expect } from "@playwright/test";

/**
 * This method receives a list of elements and validates that they are visible.
 * @param locators 
 */
export default async function expectElementsToBeVisible(locators: Locator[]) {
  for (const locator of locators) {
    await expect(locator).toBeVisible();
  }
}