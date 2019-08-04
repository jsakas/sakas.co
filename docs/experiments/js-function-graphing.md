---
imports: |
    import AsyncComponent from '@components/async/AsyncComponent';
    let resolve = () => import('@components/grapher/Grapher');
id: 6
type: component
slug: js-function-graphing
title: JavaScript Function Graphing
description: Graphing mathematical functions on a canvas
---

<AsyncComponent resolve={resolve} />