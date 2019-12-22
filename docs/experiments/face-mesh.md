---
imports: |
    import AsyncComponent from '@components/async/AsyncComponent';
    
    import Headshot from '@components/headshot/Headshot';
    import GalaxySVG from '@images/galaxy_mesh.svg?dimensions=false';


    const container = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    };

    const style = {
        width: '100%',
    }

id: 7
type: component
slug: face-mesh
title: Face Mesh
description: Experimenting with SVGs
---


<div style={container}>
    <Headshot 
        HeadshotMesh={GalaxySVG}
        style={style}
        T1={1}
        I1={.1}
        yoyo={true}
        repeat={1000}
    />
</div>
