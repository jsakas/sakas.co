---
imports: |
    import AsyncComponent from '@components/async/AsyncComponent';
    let resolve = () => import('@components/typer/CryptoTyper');
id: 5
type: component
slug: crypto-typer
title: Crypto Typer
description: A possible page intro
---

<AsyncComponent resolve={resolve} />
