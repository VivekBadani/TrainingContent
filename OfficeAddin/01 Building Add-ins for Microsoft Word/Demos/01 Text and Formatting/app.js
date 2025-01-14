/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';
import { base64Image } from "./base64Image";
(function () {
    Office.initialize = function (reason) {
        $(document).ready(function () {

            // ensure client supports 1.3 APIs
            if (!Office.context.requirements.isSetSupported('WordApi', 1.3)) {
                console.log('Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office.');
            }

            // wire up button click events
            $('#insert-paragraph').click(insertParagraph);
            $('#apply-style').click(applyStyle);
            $('#apply-custom-style').click(applyCustomStyle);
            $('#change-font').click(changeFont);
            $('#insert-text-into-range').click(insertTextIntoRange);
            $('#insert-text-outside-range').click(insertTextBeforeRange);
            $('#replace-text').click(replaceText);
        });
    };

    function insertParagraph() {
        Word.run(function (context) {
            const docBody = context.document.body;
            docBody.insertParagraph("Office has several versions, including Office 2016, Office 365 Click-to-Run, and Office Online.", "Start");
            return context.sync();
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function applyStyle() {
        Word.run(function (context) {
            const firstParagraph = context.document.body.paragraphs.getFirst();
            firstParagraph.styleBuiltIn = Word.Style.intenseReference;
            return context.sync();
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function applyCustomStyle() {
        Word.run(function (context) {
            const lastParagraph = context.document.body.paragraphs.getLast();
            lastParagraph.style = "MyCustomStyle";
            return context.sync();
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function changeFont() {
        Word.run(function (context) {
            const secondParagraph = context.document.body.paragraphs.getFirst().getNext();
            secondParagraph.font.set({
                name: "Courier New",
                bold: true,
                size: 18
            });
            return context.sync();
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function insertTextIntoRange() {
        Word.run(function (context) {
            const doc = context.document;
            const originalRange = doc.getSelection();
            originalRange.insertText(" (C2R)", "End");
            
            originalRange.load("text");
            return context.sync().then(function() {
                doc.body.insertParagraph("Original range: " + originalRange.text, "End");
            }).then(context.sync);
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function insertTextBeforeRange() {
        Word.run(function (context) {
            const doc = context.document;
            const originalRange = doc.getSelection();
            originalRange.insertText("Office 2019, ", "Before");

            originalRange.load("text");
            return context.sync().then(function() {
                doc.body.insertParagraph("Current text of original range: " + originalRange.text, "End");
            }).then(context.sync);
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function replaceText() {
        Word.run(function (context) {
            const doc = context.document;
            const originalRange = doc.getSelection();
            originalRange.insertText("many", "Replace");

            return context.sync();
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }
})();