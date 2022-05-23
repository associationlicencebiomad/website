<script>
import TimelineItem from "./timelineItem/TimelineItem.svelte";
import { Type, Position } from "./timelineItem/timeline.type";

</script>

<ul class="timeline">
	<TimelineItem date="2024 — aujourd'hui" name='LBM3' place='Paris' type={Type.education} description="Tchoupi" position={Position.right}/>
	<TimelineItem date="2023 — 2024" name='LBM2' place='Station biologique de Roscoff' type={Type.education} description="Tchoupi" position={Position.left}/>
	<TimelineItem date="été 2022" name='Developeur fullstack' place='Stef Transport' type={Type.work} description="Mise en place d'une librairie de dématérialisation" position={Position.right}/>
	<TimelineItem date="2021 — 2022" name='LBM1' place='Station biologique de Roscoff' type={Type.education} position={Position.left}/>
	<TimelineItem date="Juin 2020" name='Stage en tant que dev backend' place='Stef Transport' type={Type.internship} description="Mise en place d'une librairie de dématérialisation" position={Position.right}/>
</ul>

<style lang="scss">
	@import './Timeline';	
</style>
