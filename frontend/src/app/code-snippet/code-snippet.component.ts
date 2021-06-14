/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { CodeSnippetService } from '../Services/code-snippet.service'
import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-user-details',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  public snippet: any
  public selectedLines: number[]
  public result: string = 'send'
  public submit = 'send'
  public correct = 'check'
  public wrong = 'clear'
  constructor (@Inject(MAT_DIALOG_DATA) public dialogData: any, private readonly codeSnippetService: CodeSnippetService) { }

  ngOnInit () {
    this.codeSnippetService.get(this.dialogData.key).subscribe((snippet) => {
      this.snippet = snippet
    }, (err) => {
      this.snippet = { snippet: JSON.stringify(err.error?.error), vulnLines: [] }
    })
  }

  addLine = (lines) => {
    this.selectedLines = lines
  }

  checkLines = () => {
    let res = true
    if (this.selectedLines.length !== this.snippet.vulnLines.length) res = false
    for (let i = 0; i < this.selectedLines.length; i++) {
      if (!this.selectedLines.includes(this.snippet.vulnLines[i])) {
        res = false
      }
    }
    if (res) {
      this.result = this.correct
    } else {
      this.result = this.wrong
    }
  }
}
